import breedingData from './breeding-records.json';

// Calculate current statistics
const totalEwesMated = breedingData.records.reduce((sum, record) => sum + record.ewes, 0);
const totalRamsUsed = breedingData.records.reduce((sum, record) => sum + record.rams, 0);
const averageMatingDays = Math.round(breedingData.records.reduce((sum, record) => sum + record.days, 0) / breedingData.records.length);
const totalMatingGroups = breedingData.records.length;

// Example historical data (in a real app, this would come from a historical database)
const lastYearEwes = 95;
const lastYearRams = 96;
const lastYearDays = 31;
const lastYearGroups = 2;

// Calculate growth rates
const ewesGrowthRate = Math.round(((totalEwesMated - lastYearEwes) / lastYearEwes) * 100);
const ramsGrowthRate = Math.round(((totalRamsUsed - lastYearRams) / lastYearRams) * 100);
const daysGrowthRate = Math.round(((averageMatingDays - lastYearDays) / lastYearDays) * 100);
const groupsGrowthRate = Math.round(((totalMatingGroups - lastYearGroups) / lastYearGroups) * 100);

// Create overview card data in the same format as broverviewCard.json
export default [
    {
        "type": "primary",
        "icon": "arrow-growth",
        "total": totalEwesMated.toString(),
        "suffix": "",
        "prefix": "",
        "label": "Ewes Mated",
        "growth": ewesGrowthRate >= 0 ? "upward" : "downward",
        "growthRate": Math.abs(ewesGrowthRate).toString(),
        "dataPeriod": "Since Last Year"
    },
    {
        "type": "info",
        "icon": "users-alt",
        "total": totalRamsUsed.toString(),
        "suffix": "",
        "prefix": "",
        "label": "Rams Used",
        "growth": ramsGrowthRate >= 0 ? "upward" : "downward",
        "growthRate": Math.abs(ramsGrowthRate).toString(),
        "dataPeriod": "Ram Ewe Ratio"
    },
    {
        "type": "success",
        "icon": "usd-circle",
        "total": averageMatingDays.toString(),
        "suffix": " Days",
        "prefix": "",
        "label": "Ave Mating Days",
        "growth": daysGrowthRate >= 0 ? "upward" : "downward",
        "growthRate": Math.abs(daysGrowthRate).toString(),
        "dataPeriod": "Since Last Year"
    },
    {
        "type": "warning",
        "icon": "users-alt",
        "total": totalMatingGroups.toString(),
        "suffix": "",
        "prefix": "",
        "label": "# Mating Groups",
        "growth": groupsGrowthRate >= 0 ? "upward" : "downward",
        "growthRate": Math.abs(groupsGrowthRate).toString(),
        "dataPeriod": "Since Last Year"
    }
];
