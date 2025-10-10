document.addEventListener('DOMContentLoaded', () => {
    const gradeSelect = document.getElementById('grade-select');
    const sectionSelect = document.getElementById('section-select');
    const scheduleDisplay = document.getElementById('schedule-display');

    // Mapeo de grados y sus secciones correspondientes
    const schedules = {
        '1': ['A', 'B', 'C'],
        '2': ['A', 'B', 'C'],
        '3': ['A', 'B', 'C'],
        '4': ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        '5': ['A', 'C', 'D', 'E', 'F', 'G'],
        '6': ['A', 'C', 'D', 'E', 'F']
    };

    // Escucha el cambio en el selector de grados
    gradeSelect.addEventListener('change', () => {
        const selectedGrade = gradeSelect.value;
        sectionSelect.innerHTML = '<option value="">-- Selecciona una Sección --</option>'; // Limpia las secciones anteriores
        sectionSelect.disabled = true; // Deshabilita el selector de secciones por defecto
        scheduleDisplay.innerHTML = '<p class="placeholder-text">Por favor, selecciona un grado y una sección para ver el horario.</p>';

        if (selectedGrade) {
            const sections = schedules[selectedGrade];
            if (sections) {
                sections.forEach(section => {
                    const option = document.createElement('option');
                    option.value = section;
                    option.textContent = section;
                    sectionSelect.appendChild(option);
                });
                sectionSelect.disabled = false; // Habilita el selector de secciones
            }
        }
    });

    // Escucha el cambio en el selector de secciones
    sectionSelect.addEventListener('change', () => {
        const selectedGrade = gradeSelect.value;
        const selectedSection = sectionSelect.value;
        
        if (selectedGrade && selectedSection) {
            const imageUrl = `images/${selectedGrade}${selectedSection}.jpg`;
            
            // Crea un nuevo objeto Image para verificar si la imagen existe
            const img = new Image();
            img.onload = () => {
                // Si la imagen carga, la muestra
                scheduleDisplay.innerHTML = `<img src="${imageUrl}" alt="Horario de ${selectedGrade} ${selectedSection}">`;
            };
            img.onerror = () => {
                // Si la imagen no se encuentra, muestra un mensaje de error
                scheduleDisplay.innerHTML = `<p class="placeholder-text">Horario no disponible para ${selectedGrade} ${selectedSection}.</p>`;
            };
            img.src = imageUrl;
        } else {
            // Si no hay selección, muestra el texto por defecto
            scheduleDisplay.innerHTML = '<p class="placeholder-text">Por favor, selecciona un grado y una sección para ver el horario.</p>';
        }
    });
});