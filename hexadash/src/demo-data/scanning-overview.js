import scanningData from './scanning-records.json';
import breedingData from './breeding-records.json';

// Get the total ewes mated directly from breeding data to ensure consistency
const totalEwesMated = breedingData.records.reduce((sum, record) => sum + record.ewes, 0);

// Calculate scanning statistics
let totalEwesScanned = 0;
let totalEwesPregnant = 0;
let totalDryEwes = 0;
let totalExpFetuses = 0;

// Process each scanning record
scanningData.records.forEach(scanRecord => {
    // Add scanning metrics
    totalEwesScanned += scanRecord.ewesScanned;
    totalEwesPregnant += scanRecord.ewesPregnant;
    totalDryEwes += scanRecord.dryEwes;
    totalExpFetuses += scanRecord.expFetuses;
});

// Calculate percentages
const averageConceptionRate = Math.round((totalEwesPregnant / totalEwesScanned) * 100);
const lambingPercentScanned = Math.round((totalExpFetuses / totalEwesScanned) * 100);
const lambingPercentMated = Math.round((totalExpFetuses / totalEwesMated) * 100);

// Example historical data - matching with breeding-overview.js
const lastYearMated = 95; // Match with breeding-overview.js lastYearEwes
const lastYearScanned = 90; // Slightly less than mated (some ewes not scanned)
const lastYearPregnant = 80; // Realistic conception rate
const lastYearDryEwes = 10; // lastYearScanned - lastYearPregnant
const lastYearFetuses = 120; // About 1.5 lambs per pregnant ewe
const lastYearConceptionRate = 89; // (lastYearPregnant / lastYearScanned) * 100
const lastYearLambingPercentScanned = 133; // (lastYearFetuses / lastYearScanned) * 100
const lastYearLambingPercentMated = 126; // (lastYearFetuses / lastYearMated) * 100

// Calculate growth rates
const matedGrowthRate = Math.round(((totalEwesMated - lastYearMated) / lastYearMated) * 100);
const scannedGrowthRate = Math.round(((totalEwesScanned - lastYearScanned) / lastYearScanned) * 100);
const pregnantGrowthRate = Math.round(((totalEwesPregnant - lastYearPregnant) / lastYearPregnant) * 100);
const dryEwesGrowthRate = Math.round(((totalDryEwes - lastYearDryEwes) / lastYearDryEwes) * 100);
const fetusesGrowthRate = Math.round(((totalExpFetuses - lastYearFetuses) / lastYearFetuses) * 100);
const conceptionRateGrowthRate = Math.round(((averageConceptionRate - lastYearConceptionRate) / lastYearConceptionRate) * 100);
const lambingPercentScannedGrowthRate = Math.round(((lambingPercentScanned - lastYearLambingPercentScanned) / lastYearLambingPercentScanned) * 100);
const lambingPercentMatedGrowthRate = Math.round(((lambingPercentMated - lastYearLambingPercentMated) / lastYearLambingPercentMated) * 100);

// Create overview card data
export default [
    {
        "type": "primary",
        "icon": "users",
        "total": totalEwesMated.toString(),
        "suffix": "",
        "prefix": "",
        "label": "Ewes Mated",
        "growth": matedGrowthRate >= 0 ? "upward" : "downward",
        "growthRate": Math.abs(matedGrowthRate).toString(),
        "dataPeriod": "Since Last Year"
    },
    {
        "type": "success",
        "icon": "users",
        "total": totalEwesScanned.toString(),
        "suffix": "",
        "prefix": "",
        "label": "Ewes Scanned",
        "growth": scannedGrowthRate >= 0 ? "upward" : "downward",
        "growthRate": Math.abs(scannedGrowthRate).toString(),
        "dataPeriod": "Since Last Year"
    },
    {
        "type": "info",
        "icon": "check-circle",
        "total": totalEwesPregnant.toString(),
        "suffix": "",
        "prefix": "",
        "label": "Ewes Pregnant",
        "growth": pregnantGrowthRate >= 0 ? "upward" : "downward",
        "growthRate": Math.abs(pregnantGrowthRate).toString(),
        "dataPeriod": "Since Last Year"
    },
    {
        "type": "warning",
        "icon": "times-circle",
        "total": totalDryEwes.toString(),
        "suffix": "",
        "prefix": "",
        "label": "Dry Ewes",
        "growth": dryEwesGrowthRate >= 0 ? "upward" : "downward",
        "growthRate": Math.abs(dryEwesGrowthRate).toString(),
        "dataPeriod": "Since Last Year"
    },
    {
        "type": "primary",
        "icon": "percentage",
        "total": averageConceptionRate.toString(),
        "suffix": "%",
        "prefix": "",
        "label": "Conception Ratio",
        "growth": conceptionRateGrowthRate >= 0 ? "upward" : "downward",
        "growthRate": Math.abs(conceptionRateGrowthRate).toString(),
        "dataPeriod": "Since Last Year"
    },
    {
        "type": "success",
        "icon": "heart",
        "total": totalExpFetuses.toString(),
        "suffix": "",
        "prefix": "",
        "label": "Expected Lambs",
        "growth": fetusesGrowthRate >= 0 ? "upward" : "downward",
        "growthRate": Math.abs(fetusesGrowthRate).toString(),
        "dataPeriod": "Since Last Year"
    },
    {
        "type": "info",
        "icon": "chart-line",
        "total": lambingPercentScanned.toString(),
        "suffix": "%",
        "prefix": "",
        "label": "Lambing % Scanned",
        "growth": lambingPercentScannedGrowthRate >= 0 ? "upward" : "downward",
        "growthRate": Math.abs(lambingPercentScannedGrowthRate).toString(),
        "dataPeriod": "Since Last Year"
    },
    {
        "type": "warning",
        "icon": "chart-pie",
        "total": lambingPercentMated.toString(),
        "suffix": "%",
        "prefix": "",
        "label": "Lambing % Mated",
        "growth": lambingPercentMatedGrowthRate >= 0 ? "upward" : "downward",
        "growthRate": Math.abs(lambingPercentMatedGrowthRate).toString(),
        "dataPeriod": "Since Last Year"
    }
];
