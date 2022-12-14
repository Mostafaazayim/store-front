import { user } from '../models/user';
import { userStore } from '../models/user';

const stor = new userStore();

describe('User Model', () => {
  it('should have a getUsers  method', () => {
    expect(stor.index).toBeDefined();
  });

  it('should have a getUserById method', () => {
    expect(stor.show).toBeDefined();
  });

  it('should have a createUser method', () => {
    expect(stor.create).toBeDefined();
  });
  it('should have a deleteUser method', () => {
    expect(stor.delete).toBeDefined();
  });

  it('should create a user with auth to true using createUser method', async () => {
    const users: user = await stor.create({
      username:'mostafa',
      password_digest: 'mostafa123',
    });
    
   
    expect(users.username).toEqual('mostafa');
    
   
  });

   it('should return the correct user using getUserById method', async () => {
    
     const users: user = await stor.show("1");
     
    
      expect(users.username).toEqual('mostafa');
      expect(users.password_digest.length).toBeGreaterThanOrEqual(60);
    });
  
});