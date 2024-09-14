import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { createGoal } from '../../functions/create-goal';
import { getWeekPedingGoals } from '../../functions/get-week-pending-goals';


export const getPendingGoalsRoute = async app => {
    app.get('/peding-goals', async () => {
        const {pendingGoals}= await getWeekPedingGoals()
    
        return { pendingGoals }
    })
}