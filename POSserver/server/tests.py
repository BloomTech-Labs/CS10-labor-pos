from graphene import Client
from ..schema import schema


def test_createUser():
    client = Client(schema)
    executed = client.execute(
        """{ mutation {
            createUser(username: 'TestUser',
            password: 'password',
            email: 'email',
            firstName: 'First',
            lastName: 'User',
            streetAddress: '123 Random Drive',
            city: 'Seattle',
            state: 'WA',
            zipcode: '12345') {
                user { username }}}}"""
    )
    assert executed == {"data": {"user": {"username": "TestUser"}}}
