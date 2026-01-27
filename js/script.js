document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       1. HEADER DINÂMICO (COR E TAMANHO AO ROLAR)
       ============================================================ */
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(15, 0, 53, 0.95)';
                header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
                header.style.padding = '15px 0';
            } else {
                header.style.background = 'transparent';
                header.style.boxShadow = 'none';
                header.style.padding = '30px 0';
            }
        });
    }

    /* ============================================================
       2. SCROLL SUAVE PARA LINKS INTERNOS
       ============================================================ */
    document.querySelectorAll('.nav-links a, .btn-primary, .btn-cv-purple, .btn-cv').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /* ============================================================
       3. REVEAL CINEMATOGRÁFICO (COM DESFOQUE E CASCATA)
       ============================================================ */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Seleciona as peças individuais dentro da seção
                const items = entry.target.querySelectorAll('h1, h2, h3, p, .service-card, .skill-card, .portfolio-item, .image-circle, .btn-cv, img');
                
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.filter = 'blur(0px)'; // Volta o foco
                        item.style.transform = 'translateY(0) scale(1)';
                        item.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
                        item.classList.add('ready-to-tilt'); // Habilita o motor de mouse
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => revealObserver.observe(section));

    /* ============================================================
       4. MOTOR DE MOUSE INDIVIDUAL (TILT + LEVITAÇÃO)
       ============================================================ */
    document.addEventListener('mousemove', (e) => {
        const targets = document.querySelectorAll('.ready-to-tilt');
        
        targets.forEach(item => {
            const rect = item.getBoundingClientRect();
            
            // Verifica se o mouse está EXATAMENTE sobre este elemento
            const isInside = (
                e.clientX >= rect.left && e.clientX <= rect.right && 
                e.clientY >= rect.top && e.clientY <= rect.bottom
            );

            if (isInside) {
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                // Inclinação limitada a 12 graus para elegância
                const rotX = Math.max(Math.min((centerY - e.clientY) / 10, 12), -12);
                const rotY = Math.max(Math.min((e.clientX - centerX) / 10, 12), -12);
                
                item.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s';
                item.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-10px) scale(1.04)`;
                item.style.zIndex = "100";
            } else {
                // Reset suave ao sair do elemento
                item.style.transition = 'all 0.6s ease-in-out';
                item.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
                item.style.zIndex = "1";
            }
        });
    });

    /* ============================================================
       5. CURSOR MAGNÉTICO E EFEITO DE BRILHO (SHINE)
       ============================================================ */
    // Criar cursor se não existir
    if (!document.querySelector('.custom-cursor')) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            const isHovering = e.target.closest('.ready-to-tilt, a, button');
            cursor.style.transform = isHovering ? 'scale(2.5)' : 'scale(1)';
        });
    }

    // Adicionar brilho dinâmico nos cards
    document.querySelectorAll('.service-card, .skill-card, .portfolio-item').forEach(card => {
        if (!card.querySelector('.card-shine')) {
            const shine = document.createElement('div');
            shine.className = 'card-shine';
            card.style.position = 'relative';
            card.style.overflow = 'hidden';
            card.appendChild(shine);

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, transparent 80%)`;
            });
        }
    });
    /* ============================================================
       6. BOTÃO VOLTAR AO TOPO (APARECER E ROLAR)
       ============================================================ */
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        // Aparece depois de descer 400px
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});