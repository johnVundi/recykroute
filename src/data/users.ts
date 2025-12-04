// Dummy user data for authentication simulation
export interface User {
    id: string;
    firstName: string;
    secondName: string;
    phoneNumber: string;
    ward: string;
    email: string;
    password: string;
    createdAt: string;
}

// Initial dummy user
export const users: User[] = [
    {
        id: '1',
        firstName: 'Test',
        secondName: 'User',
        phoneNumber: '1234567890',
        ward: 'Athi River',
        email: 'test@gmail.com',
        password: 'password123',
        createdAt: new Date().toISOString(),
    },
];

// Helper functions for user management
export const findUserByEmail = (email: string): User | undefined => {
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

export const findByPhone = (phoneNumber: string): User | undefined => {
    return users.find(user => user.phoneNumber === phoneNumber);
};

export const addUser = (firstName: string, secondName: string, email: string, phoneNumber: string, ward: string, password: string): User => {
    const newUser: User = {
        id: (users.length + 1).toString(),
        firstName,
        secondName,
        phoneNumber,
        ward,
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
