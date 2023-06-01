from flask import jsonify, request
from app import app, Session
from models import Task

@app.route('/api/toggle_task_status/<int:task_id>', methods=['POST', 'PUT'])
def toggle_task_status(task_id):
    # Start a new session
    session = Session()

    # Retrieve the task by its ID
    task = session.query(Task).get(task_id)

    if task:
        # Toggle the task status
        task.status = not task.status
        task.edited_by_admin = True
        session.commit()
        session.close()

        response = {
            'message': 'Task state updated successfully'
        }
        return jsonify(response), 200
    else:
        # Task not found, return an error response
        session.close()
        response = {
            'error': 'Task not found'
        }
        return jsonify(response), 404
