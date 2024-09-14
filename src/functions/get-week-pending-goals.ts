import dayjs from "dayjs";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";
import { and, gte, lte, sql } from "drizzle-orm";
import { count } from "console";
import { title } from "process";

export async function getWeekPedingGoals() {

    const firstDayOfWeek = dayjs().startOf('week').toDate()
    const lastDayOfWeek = dayjs().endOf('week').toDate()

    const goalsCreateUpToWeek = db.$with('goals_createed_up_to_week').as(
        db.select({
            id: goals.id,
            title: goals.title,
            desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
            createdAt: goals.createdAt,
            })
            .from(goals).where(lte(goals.createdAt, lastDayOfWeek))
            .groupBy(goalCompletions.goalId)
    )


    const pendingGoals = await db
    .with(goalsCreateUpToWeek, goalCompletionCounts)
    .select({
        id: goalsCreateUpToWeek.id,
    })
    .from(goalsCreateUpToWeek)
    .leftJoin((goalCompletionCounts), eq(goalCompletionCounts.goalId, goalsCreateUpToWeek))

    return {pendingGoals}
}