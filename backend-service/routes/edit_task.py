from flask import jsonify, request
from app import app, Session
from models import Task

@app.route('/api/edit_task', methods=['POST'])
def edit_task():
    # Get data from request body
    data = request.json
    username = data.get('username')
    email = data.get('email')
    task_text = data.get('task_text')

    # Create a new task with the provided data
    new_task = Task(username=username, email=email, task_text=task_text, status=True)

    session = Session()
    session.add(new_task)
    session.commit()

    # Prepare the response with the created task details
    response = {
        'id': new_task.id,
        'username': new_task.username,
        'email': new_task.email,
        'task_text': new_task.task_text,
        'status': new_task.status
    }

    session.close()

    return jsonify(response), 201
