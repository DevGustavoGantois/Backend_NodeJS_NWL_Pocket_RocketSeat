import fastify from "fastify";
import {serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod';
import { createGoal } from "../functions/create-goal";
import z from 'zod'
import { getWeekPedingGoals } from "../functions/get-week-pending-goals";
import { createGoalRoute } from "./routes/create-goal";
import { createCompletionRoute } from "./routes/create-completion-goals";
import { getPendingGoalsRoute } from "./routes/get-pending-goals";
import { getWeekSummaryRoute } from "./routes/get-week-summary";
import  fastifyCors from '@fastify/cors';

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
    origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalRoute)
app.register(createCompletionRoute)
app.register(getPendingGoalsRoute)
app.register(getWeekSummaryRoute)


app.listen({
    port: 3333,
}).then(() => {
    console.log("HTTP server running!")
})