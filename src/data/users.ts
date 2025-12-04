// Dummy user data for authentication simulation
export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: string;
}

// Initial dummy user
export const users: User[] = [
    {
        id: '1',
        username: 'testuser',
        email: 'test@gmail.com',
        password: 'password123',
        createdAt: new Date().toISOString(),
    },
];

// Helper functions for user management
export const findUserByEmail = (email: string): User | undefined => {
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

export const findUserByUsername = (username: string): User | undefined => {
    return users.find(user => user.username.toLowerCase() === username.toLowerCase());
};

export const addUser = (username: string, email: string, password: string): User => {
    const newUser: User = {
        id: (users.length + 1).toString(),
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    return newUser;
};

export const validateCredentials = (email: string, password: string): User | null => {
    const user = findUserByEmail(email);
    if (user && user.password === password) {
        return user;
    }
    return null;
};

export const getAllUsers = (): User[] => {
    return users;
};
