// Arc Testnet Checklist Application
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const checkboxes = document.querySelectorAll('.task-checkbox-input');
    const progressBar = document.getElementById('progressBar');
    const progressCounter = document.getElementById('progressCounter');
    const progressPercentage = document.getElementById('progressPercentage');
    const completionMessage = document.getElementById('completionMessage');
    const resetButton = document.getElementById('resetButton');
    const shareButton = document.getElementById('shareButton');
    const exportButton = document.getElementById('exportButton');
    const toast = document.getElementById('toast');
    
    // Stats elements
    const beginnerCompleted = document.getElementById('beginnerCompleted');
    const intermediateCompleted = document.getElementById('intermediateCompleted');
    const advancedCompleted = document.getElementById('advancedCompleted');
    
    // Task data with difficulty levels
    const tasks = [
        { id: 'task1', difficulty: 'beginner', title: 'Setup Wallet' },
        { id: 'task2', difficulty: 'beginner', title: 'Claim Testnet Tokens' },
        { id: 'task3', difficulty: 'beginner', title: 'First Transaction' },
        { id: 'task4', difficulty: 'intermediate', title: 'Deploy Smart Contract' },
        { id: 'task5', difficulty: 'intermediate', title: 'Vote on Governance' },
        { id: 'task6', difficulty: 'intermediate', title: 'Bridge USDC' },
        { id: 'task7', difficulty: 'intermediate', title: 'Stake Tokens' },
        { id: 'task8', difficulty: 'advanced', title: 'IBC Transfer' },
        { id: 'task9', difficulty: 'advanced', title: 'Report a Bug' },
        { id: 'task10', difficulty: 'beginner', title: 'Share Experience' }
    ];
    
    // Messages for different progress levels
   
