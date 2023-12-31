"""create service table

Revision ID: 756ad653ec50
Revises: 5db1dadbbf07
Create Date: 2023-09-16 16:25:08.573540

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '756ad653ec50'
down_revision = '5db1dadbbf07'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('services',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('freelancerId', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=True),
    sa.Column('price', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['freelancerId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('services')
    # ### end Alembic commands ###