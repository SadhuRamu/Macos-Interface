document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = signupForm.querySelector('input[name="lastname"]').value.trim();
            const email = signupForm.querySelector('input[name="Email"]').value.trim();
            const password = signupForm.querySelector('input[name="password"]').value.trim();

            if (!name || !email || !password) {
                alert('Please fill in all fields');
                return;
            }

            const users = JSON.parse(localStorage.getItem('macos_users') || '[]');
            
            // Check if user exists
            if (users.find(u => u.name === name || u.email === email)) {
                alert('User with this name or email already exists. Please login.');
                return;
            }

            users.push({ name, email, password });
            localStorage.setItem('macos_users', JSON.stringify(users));
            
            // Auto login and redirect
            sessionStorage.setItem('macos_logged_in_user', name);
            window.location.href = '/public/front_page.html';
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = loginForm.querySelector('input[name="username"]').value.trim();
            const password = loginForm.querySelector('input[name="password"]').value.trim();

            if (!username || !password) {
                alert('Please fill in all fields');
                return;
            }

            const users = JSON.parse(localStorage.getItem('macos_users') || '[]');
            const user = users.find(u => u.name === username);

            if (!user) {
                alert('Invalid Username');
                return;
            }

            if (user.password !== password) {
                alert('Invalid password');
                return;
            }

            sessionStorage.setItem('macos_logged_in_user', username);
            window.location.href = '/public/front_page.html';
        });
    }

    const forgotForm = document.getElementById('forgotForm');
    if (forgotForm) {
        forgotForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = forgotForm.querySelector('input[name="username"]').value.trim();
            const email = forgotForm.querySelector('input[name="email"]').value.trim();

            if (!username || !email) {
                alert('Please fill in all fields');
                return;
            }

            const users = JSON.parse(localStorage.getItem('macos_users') || '[]');
            const user = users.find(u => u.name === username && u.email === email);

            if (!user) {
                alert('User not found');
                return;
            }

            alert(`Your password is: ${user.password}`);
            window.location.href = '/public/login.html';
        });
    }

    const changePassForm = document.getElementById('changePassForm');
    if (changePassForm) {
        changePassForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = changePassForm.querySelector('input[name="username"]').value.trim();
            const email = changePassForm.querySelector('input[name="email"]').value.trim();
            const newPassword = changePassForm.querySelector('input[name="new_password"]').value.trim();

            if (!username || !email || !newPassword) {
                alert('Please fill in all fields');
                return;
            }

            const users = JSON.parse(localStorage.getItem('macos_users') || '[]');
            const userIndex = users.findIndex(u => u.name === username && u.email === email);

            if (userIndex === -1) {
                alert('User not found or email does not match');
                return;
            }

            users[userIndex].password = newPassword;
            localStorage.setItem('macos_users', JSON.stringify(users));

            alert('Password changed successfully');
            window.location.href = '/public/login.html';
        });
    }
});
