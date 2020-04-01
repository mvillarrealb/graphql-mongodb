import { InputType, Field, ID } from "@nestjs/graphql";
import { IsDateString, MinLength, IsUUID } from 'class-validator';

@InputType()
export class CreateLessonInput {
    @Field()
    name: string;
    @Field()
    @IsDateString()
    startDate: string;
    @Field()
    @IsDateString()
    endDate: string;
    @Field(type => [ID], { defaultValue: []})
    @IsUUID("4", { each:true})
    studentIds: string[];
}