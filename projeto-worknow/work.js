/**STATUS */
const counters = document.querySelectorAll('.stat-number');
 
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
 
            const update = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString('pt-BR');
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target.toLocaleString('pt-BR');
                }
            };
 
            update();
        });