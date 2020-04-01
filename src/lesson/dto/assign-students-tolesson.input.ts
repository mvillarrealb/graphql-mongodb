import { InputType, Field, ID } from "@nestjs/graphql";
import { IsUUID, MinLength } from 'class-validator';

@InputType()
export class AssignStudentsToLessonInput {
    @Field(type => [ID])
    @IsUUID("4", { each:true})
    studentIds: string[];

    @Field(type => ID)
    @IsUUID("4")
    lessonId: string;
}
