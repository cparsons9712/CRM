"""empty message

Revision ID: b80edb5a9263
Revises: 018724e0c619
Create Date: 2023-09-16 15:13:51.975505

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b80edb5a9263'
down_revision = '018724e0c619'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tasks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('freelancerId', sa.Integer(), nullable=False),
    sa.Column('clientId', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=50), nullable=False),
    sa.Column('priority', sa.String(length=5), nullable=False),
    sa.Column('completed', sa.Boolean(), nullable=True),
    sa.Column('due_date', sa.Date(), nullable=True),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
   
    sa.ForeignKeyConstraint(['clientId'], ['users.id'], ),
    sa.ForeignKeyConstraint(['freelancerId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tasks')
    # ### end Alembic commands ###
