from flask import jsonify, request
from app import app, Session
from models import Task

@app.route('/api/update_task_text/<int:task_id>', methods=['PUT'])
def edit_task_text(task_id):
    # Start a new session
    session = Session()

    # Retrieve the task with the given task_id
    task = session.query(Task).get(task_id)

    if task:
        # Get the new task text from the request body
        data = request.json
        new_task_text = data.get('task_text')

        # Update the task text
        task.task_text = new_task_text

        # Commit the changes to the database
        session.commit()

        # Close the session
        session.close()

        # Prepare the response
        response = {
            'message': 'Task text updated successfully'
        }
        return jsonify(response), 200
    else:
        # Close the session
        session.close()

        # Prepare the error response if the task is not found
        response = {
            'error': 'Task not found'
        }
        return jsonify(response), 404
