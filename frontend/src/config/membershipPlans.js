export const MEMBERSHIP_PLANS = [
    {
        id: 'starter-20',
        name: 'Starter Pack',
        price: 100,
        credits: 20,
        validityDays: 30,
        highlight: false,
        tagline: 'Best for occasional billing'
    },
    {
        id: 'growth-60',
        name: 'Growth Pack',
        price: 250,
        credits: 60,
        validityDays: 60,
        highlight: true,
        tagline: 'Most popular for small businesses'
    },
    {
        id: 'pro-150',
        name: 'Pro Pack',
        price: 500,
        credits: 150,
        validityDays: 120,
        highlight: false,
        tagline: 'Best value for heavy usage'
    }
];

export const MEMBERSHIP_PLAN_MAP = MEMBERSHIP_PLANS.reduce((acc, plan) => {
    acc[plan.id] = plan;
    return acc;
}, {});
