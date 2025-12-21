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
    
    // Task data with difficulty levels (6 tasks)
    const tasks = [
        { id: 'task1', difficulty: 'beginner', title: 'Claim Testnet USDC' },
        { id: 'task2', difficulty: 'beginner', title: 'Setup MetaMask for Arc' },
        { id: 'task3', difficulty: 'beginner', title: 'Send Test Transaction' },
        { id: 'task4', difficulty: 'intermediate', title: 'Deploy Smart Contract' },
        { id: 'task5', difficulty: 'intermediate', title: 'Interact with Contract' },
        { id: 'task6', difficulty: 'beginner', title: 'Share Experience' }
    ];
    
    console.log('✅ Arc Testnet Checklist - Initialized');
    console.log('📊 Total tasks:', tasks.length);
    console.log('📋 Total checkboxes:', checkboxes.length);
    
    // Messages for different progress levels
    const messages = [
        { min: 0, max: 0, text: "Start checking tasks to track your progress!" },
        { min: 1, max: 2, text: "Great start! You're getting familiar with Arc testnet." },
        { min: 3, max: 4, text: "Excellent progress! You're becoming an Arc power user." },
        { min: 5, max: 5, text: "Almost there! One more task to complete." },
        { min: 6, max: 6, text: "🎉 Congratulations! You've completed all Arc testnet tasks!" }
    ];
    
    // Initialize from localStorage or set defaults
    function initializeChecklist() {
        const savedState = localStorage.getItem('arcChecklistState');
        
        if (savedState) {
            try {
                const state = JSON.parse(savedState);
                console.log('💾 Loaded saved progress');
                
                checkboxes.forEach(checkbox => {
                    if (state[checkbox.id]) {
                        checkbox.checked = true;
                    }
                });
            } catch (error) {
                console.error('❌ Error loading saved state:', error);
                localStorage.removeItem('arcChecklistState');
            }
        }
        
        updateProgress();
    }
    
    // Update progress bar and counters
    function updateProgress() {
        const totalTasks = checkboxes.length;
        const completedTasks = Array.from(checkboxes).filter(cb => cb.checked).length;
        const percentage = (completedTasks / totalTasks) * 100;
        
        // Update progress bar
        progressBar.style.width = `${percentage}%`;
        
        // Update counter
        progressCounter.textContent = `${completedTasks}/${totalTasks} tasks completed`;
        
        // Update percentage
        progressPercentage.textContent = `${Math.round(percentage)}%`;
        
        // Update completion message
        const message = messages.find(m => completedTasks >= m.min && completedTasks <= m.max);
        if (message) {
            completionMessage.textContent = message.text;
        }
        
        // Update stats by difficulty
        updateDifficultyStats();
        
        // Save state to localStorage
        saveState();
        
        console.log(`📊 Progress: ${completedTasks}/${totalTasks} (${Math.round(percentage)}%)`);
    }
    
    // Update difficulty statistics
    function updateDifficultyStats() {
        let beginnerCount = 0;
        let intermediateCount = 0;
        let advancedCount = 0;
        
        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                const task = tasks[index];
                if (task) {
                    if (task.difficulty === 'beginner') {
                        beginnerCount++;
                    } else if (task.difficulty === 'intermediate') {
                        intermediateCount++;
                    } else if (task.difficulty === 'advanced') {
                        advancedCount++;
                    }
                }
            }
        });
        
        // Update stats display
        if (beginnerCompleted) beginnerCompleted.textContent = beginnerCount;
        if (intermediateCompleted) intermediateCompleted.textContent = intermediateCount;
        if (advancedCompleted) advancedCompleted.textContent = advancedCount;
        
        console.log(`🏆 Stats - Beginner: ${beginnerCount}, Intermediate: ${intermediateCount}, Advanced: ${advancedCount}`);
    }
    
    // Save checklist state to localStorage
    function saveState() {
        const state = {};
        checkboxes.forEach(checkbox => {
            state[checkbox.id] = checkbox.checked;
        });
        
        try {
            localStorage.setItem('arcChecklistState', JSON.stringify(state));
        } catch (error) {
            console.error('❌ Error saving to localStorage:', error);
        }
    }
    
    // Show toast notification
    function showToast(message) {
        if (!toast) return;
        
        const toastMessage = toast.querySelector('.toast-message');
        if (toastMessage) {
            toastMessage.textContent = message;
        }
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // Reset all checkboxes
    function resetChecklist() {
        if (confirm('Are you sure you want to reset all progress?')) {
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            updateProgress();
            showToast('All progress reset!');
        }
    }
    
    // Share progress
    function shareProgress() {
        const completedTasks = Array.from(checkboxes).filter(cb => cb.checked).length;
        const totalTasks = checkboxes.length;
        const percentage = Math.round((completedTasks / totalTasks) * 100);
        
        const shareText = `🚀 I've completed ${completedTasks}/${totalTasks} tasks (${percentage}%) on the Arc Testnet Checklist!\n\nCheck it out: ${window.location.href}\n\n#ArcTestnet #BuildOnArc`;
        
        // Try to use Web Share API if available
        if (navigator.share) {
            navigator.share({
                title: 'My Arc Testnet Progress',
                text: shareText,
                url: window.location.href
            }).then(() => {
                console.log('✅ Share successful');
            }).catch(error => {
                console.log('❌ Share cancelled or failed:', error);
            });
        } else {
            // Fallback to Twitter
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
            window.open(twitterUrl, '_blank');
        }
        
        showToast('Sharing your progress!');
    }
    
    // Export tasks as text
    function exportTasks() {
        const completedTasks = Array.from(checkboxes).filter(cb => cb.checked).length;
        const totalTasks = checkboxes.length;
        
        let exportText = `Arc Testnet Checklist Progress\n`;
        exportText += `Generated: ${new Date().toLocaleDateString()}\n`;
        exportText += `Progress: ${completedTasks}/${totalTasks} tasks (${Math.round((completedTasks/totalTasks)*100)}%)\n\n`;
        
        exportText += 'TASKS:\n';
        exportText += '------\n';
        
        checkboxes.forEach((checkbox, index) => {
            const task = tasks[index];
            const status = checkbox.checked ? '✅' : '⬜';
            const taskTitle = task ? task.title : `Task ${index + 1}`;
            exportText += `${status} ${taskTitle}\n`;
        });
        
        exportText += '\n------\n';
        exportText += `Live at: ${window.location.href}\n`;
        exportText += 'Made by aki hayaka';
        
        // Create download link
        const blob = new Blob([exportText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'arc-testnet-checklist-progress.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showToast('Tasks exported!');
        console.log('📄 Tasks exported successfully');
    }
    
    // Event Listeners
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateProgress();
            showToast('Progress updated!');
        });
    });
    
    // Add event listeners for buttons
    if (resetButton) {
        resetButton.addEventListener('click', resetChecklist);
    }
    
    if (shareButton) {
        shareButton.addEventListener('click', shareProgress);
    }
    
    if (exportButton) {
        exportButton.addEventListener('click', exportTasks);
    }
    
    // Task card click (toggles checkbox)
    document.querySelectorAll('.task-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on checkbox, button, or link
            if (!e.target.closest('.task-checkbox') && 
                !e.target.closest('button') && 
                !e.target.closest('a')) {
                const checkbox = this.querySelector('.task-checkbox-input');
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    checkbox.dispatchEvent(new Event('change'));
                }
            }
        });
    });
    
    // Add Arc to MetaMask button
    const addArcButton = document.getElementById('addArcToMetaMask');
    if (addArcButton) {
        addArcButton.addEventListener('click', async function(e) {
            e.stopPropagation(); // Prevent card click
            
            // Check if MetaMask is installed
            if (typeof window.ethereum === 'undefined') {
                alert('MetaMask is not installed! Please install MetaMask extension first.\n\nVisit: https://metamask.io/download/');
                window.open('https://metamask.io/download/', '_blank');
                return;
            }
            
            try {
                // Arc Testnet configuration - OFFICIAL DATA
                const arcTestnetParams = {
                    chainId: '0x4CE512', // 5042002 in hex
                    chainName: 'Arc Testnet',
                    nativeCurrency: {
                        name: 'USDC',
                        symbol: 'USDC',
                        decimals: 18
                    },
                    rpcUrls: ['https://rpc.testnet.arc.network'],
                    blockExplorerUrls: ['https://testnet.arcscan.app']
                };
                
                console.log('🦊 Adding Arc Testnet to MetaMask...');
                addArcButton.disabled = true;
                addArcButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
                
                // Request to add the network
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [arcTestnetParams]
                });
                
                console.log('✅ Arc Testnet added successfully!');
                showToast('Arc Testnet added to MetaMask!');
                addArcButton.innerHTML = '<i class="fas fa-check"></i> Added Successfully!';
                
                // Auto check the task after 2 seconds
                setTimeout(() => {
                    const task2Checkbox = document.getElementById('task2');
                    if (task2Checkbox && !task2Checkbox.checked) {
                        task2Checkbox.checked = true;
                        task2Checkbox.dispatchEvent(new Event('change'));
                    }
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        addArcButton.disabled = false;
                        addArcButton.innerHTML = '<i class="fab fa-ethereum"></i> Add Arc to MetaMask';
                    }, 3000);
                }, 2000);
                
            } catch (error) {
                console.error('❌ Error adding Arc Testnet:', error);
                
                let errorMessage = 'Failed to add Arc Testnet to MetaMask.';
                
                if (error.code === 4001) {
                    errorMessage = 'You rejected the request. Please try again.';
                } else if (error.code === -32002) {
                    errorMessage = 'Request already pending. Please check MetaMask.';
                } else if (error.message) {
                    errorMessage = error.message;
                }
                
                showToast(errorMessage);
                addArcButton.disabled = false;
                addArcButton.innerHTML = '<i class="fab fa-ethereum"></i> Add Arc to MetaMask';
            }
        });
    } else {
        console.warn('⚠️ Add Arc to MetaMask button not found');
    }
    
    // Initialize the checklist
    initializeChecklist();
    
    console.log('🎉 Arc Testnet Checklist ready!');
});
