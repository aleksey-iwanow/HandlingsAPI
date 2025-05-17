export type StatusHandling = 'new' | 'in_progress' | 'completed' | 'cancelled';

export interface HandlingProps {
    id?: number;
    text: string;
    theme: string; 
    status: StatusHandling; 
    solution_text?: string;     
    cancel_reason?: string; 
    created_at: Date;    
}