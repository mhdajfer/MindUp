import { IQuiz } from "../../shared/Types/IQuiz";


export interface QuizRepository{
    create(quizData: IQuiz): Promise<IQuiz>;
    findOne(id: string): Promise<IQuiz>;
    findAll(): Promise<IQuiz[]>;
    editQuiz(quizData: Partial<IQuiz>): Promise<IQuiz>;
    deleteQuiz(id: string): Promise<IQuiz>;
    findByCategory(category: string): Promise<IQuiz[]>;
}