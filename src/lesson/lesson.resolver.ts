import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './dto/create-lesson.input';
import { AssignStudentsToLessonInput } from './dto/assign-students-tolesson.input';
import { Lesson } from './lesson.entity';
import { StudentService } from '../student/student.service';

@Resolver(of => LessonType)
export class LessonResolver {
    constructor(
        private readonly lessonService: LessonService,
        private readonly studentService: StudentService,
    ) {}
    @Query(returns => LessonType)
    lesson(
        @Args('id') id: string,
    ) {
        return this.lessonService.getLesson(id);
    }
    @Mutation(returns => LessonType)
    createLesson(
        @Args('createLessonData') lessonInput: CreateLessonInput,
    ) {
        return this.lessonService.createLesson(lessonInput);
    }
    @Query(returns => [LessonType])
    lessons() {
        return this.lessonService.getLessons();
    }
    @Mutation(returns => LessonType)
    assignStudentsToLesson(
        @Args('assignInput') assignInput: AssignStudentsToLessonInput,
    ) {
        const {studentIds, lessonId} =  assignInput;
        return this.lessonService.assignStudentToLesson(lessonId, studentIds)
    }
    @ResolveField()
    async students(@Parent() lesson: Lesson) {
        const { students } = lesson;
        return this.studentService.getManyStudents(students);
    }
}
