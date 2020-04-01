import { Injectable } from '@nestjs/common';
import { Student } from './student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {StudentInput} from './student.input'
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
    ) {}
    createStudent(studentInput: StudentInput): Promise<Student> {
        const {firstName, lastName } = studentInput;
        const student = this.studentRepository.create({
            id: uuid(),
            firstName,
            lastName
        });
        return this.studentRepository.save(student);
    }
    getStudent(id: string): Promise<Student> {
        return this.studentRepository.findOne({ id });
    }
    getStudents(): Promise<Student[]> {
        return this.studentRepository.find();
    }
    getManyStudents(ids: string[]): Promise<Student[]> {
        return this.studentRepository.find({
            where: {
                id: {
                    $in: ids
                }
            }
        })
    }
}
