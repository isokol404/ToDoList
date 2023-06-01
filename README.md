# ToDoList
GitToDo is a React project that serves as a simple task planning application. It allows users to create, edit, and administer tasks. The app includes admin features for managing tasks.

# API
## Method: edit_task
Edits an existing task.

PUT /api/tasks/{task_id}
URL Parameters

task_id (required): The ID of the task to be edited.
### Request Parameters

{
  "username": "new_username",
  "email": "new_email@example.com",
  "text": "Updated task text"
}

### Example Request

PUT /api/tasks/123
Content-Type: application/json

{
  "username": "new_username",
  "text": "Updated task text"
}

### Response

Status Code: 200 OK
Response Body: None

## Method: get_tasks

Retrieves data from the task table with specified filtering.

GET /api/tasks

### Request Parameters

offset (required): The offset for pagination (starting from 0).
limit (required): The limit of tasks per page.
sort_field (required): The field to sort tasks by ('id', 'username', 'email', 'status').
sort_direction (required): The direction of the sort ('asc' or 'desc').
status (optional): The status filter for tasks ('completed', 'incomplete').

### Example Request

GET /api/tasks?offset=0&limit=10&sort_field=id&sort_direction=asc&status=completed
Response

Status Code: 200 OK
Response Body:

{
  "tasks": [
    {
      "id": 1,
      "username": "user1",
      "email": "user1@example.com",
      "text": "Task 1",
      "status": "completed",
      "edited_by_admin": true
    },
    {
      "id": 2,
      "username": "user2",
      "email": "user2@example.com",
      "text": "Task 2",
      "status": "completed",
      "edited_by_admin": false
    }
  ],
  "total_task_count": 2
}

## Method: toggle_task_status

Toggles the status of a task (between completed and incomplete).

POST /api/tasks/{task_id}/toggle
URL Parameters

task_id (required): The ID of the task to toggle.

### Response

Status Code: 200 OK
Response Body: None

## Method: edit_task_text
Edits the text of a task.

PUT /api/tasks/{task_id}/edit-text
URL Parameters

task_id (required): The ID of the task to edit.

### Request Parameters

{
  "text": "New task text"
}

### Example Request

PUT /api/tasks/123/edit-text
Content-Type: application/json

{
  "text": "New task text"
}

### Response

Status Code: 200 OK
Response Body: None
Please note that the actual implementation of these methods may vary depending on your specific application or framework. The provided examples demonstrate the expected request format and possible response.
