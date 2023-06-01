from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Task

app = Flask(__name__)
CORS(app)

engine = create_engine('sqlite:///database.db')
Session = sessionmaker(bind=engine)


@app.route('/api/edit_task', methods=['POST'])
def edit_task():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    task_text = data.get('task_text')

    new_task = Task(username=username, email=email, task_text=task_text, status=True)

    session = Session()
    session.add(new_task)
    session.commit()

    response = {
        'id': new_task.id,
        'username': new_task.username,
        'email': new_task.email,
        'task_text': new_task.task_text,
        'status': new_task.status
    }

    session.close()

    return jsonify(response), 201


@app.route('/api/tasks')
def get_tasks():
    session = Session()

    offset = request.args.get('offset', default=0, type=int)
    limit = request.args.get('limit', default=3, type=int)
    sort_field = request.args.get('sort_field', default='id_task', type=str)
    sort_direction = request.args.get('sort_direction', default='asc', type=str)
    status = request.args.get('status', default=None, type=str)

    if sort_direction not in ['asc', 'desc']:
        sort_direction = 'asc'

    allowed_sort_fields = ['id', 'username', 'email', 'task_text']
    if sort_field not in allowed_sort_fields:
        sort_field = 'id'

    if sort_direction == 'asc':
        sort_expr = getattr(Task, sort_field)
    else:
        sort_expr = getattr(Task, sort_field).desc()

    query = session.query(Task)

    if status == 'completed':
        query = query.filter(Task.status == True)
    elif status == 'incomplete':
        query = query.filter(Task.status == False)

    tasks = query.order_by(sort_expr).offset(offset).limit(limit).all()
    session.close()

    task_list = []
    for task in tasks:
        task_dict = {
            'id': task.id,
            'username': task.username,
            'email': task.email,
            'task_text': task.task_text,
            'status': task.status,
            'edited_by_admin': task.edited_by_admin
        }
        task_list.append(task_dict)

    return jsonify(task_list)


@app.route('/api/toggle_task_status/<int:task_id>', methods=['POST', 'PUT'])
def toggle_task_status(task_id):
    session = Session()
    task = session.query(Task).get(task_id)

    if task:
        task.status = not task.status
        task.edited_by_admin = True
        session.commit()
        session.close()

        response = {
            'message': 'Task state updated successfully'
        }
        return jsonify(response), 200
    else:
        session.close()
        response = {
            'error': 'Task not found'
        }
        return jsonify(response), 404


@app.route('/api/update_task_text/<int:task_id>', methods=['PUT'])
def update_task_text(task_id):
    session = Session()
    task = session.query(Task).get(task_id)

    if task:
        data = request.json
        new_task_text = data.get('task_text')

        task.task_text = new_task_text
        session.commit()
        session.close()

        response = {
            'message': 'Task text updated successfully'
        }
        return jsonify(response), 200
    else:
        session.close()
        response = {
            'error': 'Task not found'
        }
        return jsonify(response), 404


@app.route('/api')
def index():
    data = {'name': 'Hello World'}
    return jsonify(data)


@app.route("/login", methods=["POST"])
def logout():
    response = jsonify({"msg": "login successful"})
    return response


if __name__ == '__main__':
    app.run()
