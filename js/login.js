document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const signInForm = document.querySelector('.sign-in-container');
    const signUpForm = document.querySelector('.sign-up-container');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            if (signInForm.style.display === 'none') {
                signInForm.style.display = 'flex';
                signUpForm.style.display = 'none';
                mobileToggle.textContent = 'Não tem uma conta? Cadastre-se';
            } else {
                signInForm.style.display = 'none';
                signUpForm.style.display = 'flex';
                mobileToggle.textContent = 'Já tem uma conta? Faça login';
            }
        });
    }
});