import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { StudentService } from './student.service';
import {StudentType} from './student.type';
import { StudentInput } from './student.input';

@Resolver(of => StudentType)
export class StudentResolver {
    constructor(
        private readonly studentService: StudentService,
    ) {}
    @Mutation(returns => StudentType)
    createStudent(
        @Args('createStudent') studentInput: StudentInput,
    ) {
        return this.studentService.createStudent(studentInput);
    }
    @Query(returns => StudentType)
    student(
        @Args('id') id: string,
    ) {
        return this.studentService.getStudent(id);
    }
    @Query(returns => [StudentType])
    students() {
        return this.studentService.getStudents();
    }
}
