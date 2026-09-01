export interface MawqifNotification {
    id: number;
    title: string;
    desc: string;
    time: string;
    read: boolean;
}

export interface ContactMessage {
    id?: string;
    name: string;
    email: string;
    subject?: string;
    message: string;
    created_at?: string;
}
