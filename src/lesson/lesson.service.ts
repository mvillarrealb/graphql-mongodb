import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLessonInput } from './dto/create-lesson.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson)
        private readonly lessonRepository: Repository<Lesson>,
    ) {}
    
    async createLesson(lessonInput: CreateLessonInput): Promise<Lesson> {
        const {name, startDate, endDate, studentIds } = lessonInput;
        const lesson = this.lessonRepository.create({
            id: uuid(),
            name,
            startDate,
            endDate,
            students: studentIds
        });
        return this.lessonRepository.save(lesson);
    }
    getLesson(id: string): Promise<Lesson> {
        return this.lessonRepository.findOne({ id });
    }
    async getLessons(): Promise<Lesson[]> {
        return this.lessonRepository.find();
    }

    async assignStudentToLesson(lessonId: string, studentIds: string[]) {
        const lesson = await this.lessonRepository.findOne({ id: lessonId });
        lesson.students = [...lesson.students, ... studentIds];
        return this.lessonRepository.save(lesson);
    }
}
