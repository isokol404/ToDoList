from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Task(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key=True)
    username = Column(String(50), nullable=False)
    email = Column(String(100), nullable=False)
    task_text = Column(String(150), nullable=False)
    status = Column(Boolean, nullable=False)
    edited_by_admin = Column(Boolean, default=False, nullable=False)
