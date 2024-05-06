window.onload = function() {
    // Your code here (e.g., calling your desired function)
   
    InitializeUser();
    // Populate user dropdown
const userIdDropdown = document.getElementById('userId');
users.forEach(user => {
    const option = document.createElement('option');
    option.value = user.id;
    option.textContent = `User ${user.id}`;
    userIdDropdown.appendChild(option);
});

    updateUI();
    updateMileStones();
};



// Sample milestone data
const milestones = [
    { milestone: 1, earnings: 0.01 },
];

let users = [];

const system={
    balance:0
}

// Initialize users
function InitializeUser()
{
    for (let i = 1; i <= 10; i++) {
        users.push({
            id: i,
            balance: 0,
            investment: 0,
            proportion:0,
        });
    }


    users.forEach((user)=>{
        makeInvestment(user,getRandom(20,100));
    })

    for (let i = 1; i <= 29; i++) {
        milestones.push({
            milestone: milestones[i-1].milestone+1,
            earnings: milestones[i-1].earnings*2,
        });
    }

}



function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function  clickMakeInvestment(){
    const selectedUserId = parseInt(document.getElementById('userId').value);
    const investmentAmount = parseFloat(document.getElementById('investmentAmount').value);
    if (isNaN(investmentAmount) || investmentAmount <= 0) {
        alert('Please enter a valid investment amount.');
        return;
    }

    // Find the selected user
    const user = users.find(u => u.id === selectedUserId);
    if (!user) {
        alert('Invalid user selected.');
        return;
    }
    makeInvestment(user,investmentAmount);

    
}



function calculatePercentageShare(users) {
    const totalinvestment= users.reduce((total, user) => total + user.investment, 0);
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        user.proportion= (user.investment / totalinvestment) * 100;        
    }
}





function makeInvestment(user,investmentAmount) {
    // Update user's investment
    system.balance += investmentAmount;
    user.balance=investmentAmount/2;
    let actualInvestment =investmentAmount/2
    user.investment+=actualInvestment;
    // Calculate milestone earnings based on investment amount
    calculatePercentageShare(users);
    const milestoneEarnings = calculateMilestoneEarnings(actualInvestment);
    // Update user's balance
    user.balance += milestoneEarnings;
    // Update UI
    updateUI();  
}

function calculateMilestoneEarnings(investmentAmount) {
    users.forEach((user)=>{
        const share = investmentAmount * (user.proportion);
        user.balance+=share;

    })
   
    return earnings;
}

function updateUI() {
    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';
    users.forEach(user => {
        const row = `
            <tr>
                <td>${user.id}</td>
                <td>$${user.balance.toFixed(2)}</td>
                <td>$${user.investment.toFixed(2)}</td>
                <td>${findMilestone(user,milestones)}</td>
                <td>${user.proportion.toFixed(2)}%</td>
            </tr>
        `;
        userTableBody.innerHTML += row;
    });
}

function updateMileStones() {
    const milestoneTableBody = document.getElementById('milestoneTableBody');
    milestoneTableBody.innerHTML = '';
    milestones.forEach(milestone => {
        const row = `
            <tr>
                <td>${milestone.milestone}</td>
                <td>$${milestone.earnings.toFixed(2)}</td>
            </tr>
        `;
        milestoneTableBody.innerHTML += row;
    });
}

function findMilestone(user, milestones) {
    for (let i = milestones.length - 1; i >= 0; i--) {
        if (user.balance >= milestones[i].earnings) {
            return milestones[i].milestone;
        }
    }
    return 0; // User's earnings do not reach any milestone
}

