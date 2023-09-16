"""create avaliability table

Revision ID: f3be2236ad60
Revises: b80edb5a9263
Create Date: 2023-09-16 15:32:46.357140

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f3be2236ad60'
down_revision = 'b80edb5a9263'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('availability',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('dayOfWeek', sa.String(length=15), nullable=False),
    sa.Column('startTime', sa.Time(), nullable=False),
    sa.Column('endTime', sa.Time(), nullable=False),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('availability')
    # ### end Alembic commands ###