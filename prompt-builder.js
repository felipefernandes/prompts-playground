    document.addEventListener('DOMContentLoaded', function() {
        let promptPartId = 0;
        const promptBuilder = document.getElementById('prompt-builder');

        // Function to create a prompt part element with a dropdown and an adjacent input for custom option
        function createPromptPartDropdown(labelText, options, id) {
            const wrapper = document.createElement('div');
            wrapper.className = 'grid grid-cols-3 gap-2 items-center';

            const label = document.createElement('label');
            label.className = 'text-black-700';
            label.textContent = labelText;
            label.htmlFor = `prompt-part-${id}`;

            const select = document.createElement('select');
            //select.className = 'prompt-part w-full bg-white text-gray-700 border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:border-blue-500';
            select.className = 'prompt-part w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-5 text-lg leading-tight focus:outline-none focus:border-blue-500';
            select.id = `prompt-part-${id}`;

            // Placeholder option
            const placeholderOption = document.createElement('option');
            placeholderOption.value = '';
            placeholderOption.textContent = 'Opções';
            placeholderOption.disabled = true;
            placeholderOption.selected = true;
            select.appendChild(placeholderOption);

            // Predefined options
            options.forEach(optionText => {
                const option = document.createElement('option');
                option.value = optionText;
                option.textContent = optionText;
                select.appendChild(option);
            });

            // Custom input option
            const customOption = document.createElement('option');
            customOption.value = 'custom';
            customOption.textContent = 'Outro (especifique)';
            select.appendChild(customOption);

            // Custom input field, hidden by default
            const customInput = document.createElement('textarea');
            customInput.type = 'text';
            customInput.className = 'custom-input appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:border-blue-500';
            customInput.id = `custom-input-${id}`;
            customInput.style.display = 'none'; // Hide initially

            // Show custom input field when 'Other' option is selected
            select.onchange = function() {
                customInput.style.display = this.value === 'custom' ? 'block' : 'none';
                // Reset custom input value when hidden
                if (this.value !== 'custom') customInput.value = '';
            };

            const removeButton = document.createElement('button');
            removeButton.type = 'button';
            removeButton.textContent = '❌';
            removeButton.className = 'bg-white-500 hover:bg-white-700 text-white font-bold py-1 px-2 w-8 text-xs rounded';
            removeButton.onclick = function() { wrapper.remove(); };

            wrapper.appendChild(label);
            wrapper.appendChild(select);
            wrapper.appendChild(customInput);
            wrapper.appendChild(removeButton);

            return wrapper;
        }

            // Function to add a new input field for custom prompts
        function addCustomPromptInput() {
            const wrapper = document.createElement('div');
            wrapper.className = 'grid grid-cols-3 gap-2 items-center';

            const label = document.createElement('label');
            label.className = 'text-gray-700';
            label.textContent = `Parte Adicional ${promptPartId + 1}:`;
            label.htmlFor = `custom-prompt-${promptPartId}`;

            const input = document.createElement('textarea');
            input.type = 'text';
            input.className = 'prompt-part appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:border-blue-500';
            input.id = `custom-prompt-${promptPartId}`;

            const removeButton = document.createElement('button');
            removeButton.type = 'button';
            removeButton.textContent = '❌';
            removeButton.className = 'bg-white-500 hover:bg-white-700 text-white font-bold py-0.5 px-1 w-8 text-xs rounded';
            removeButton.onclick = function() { wrapper.remove(); };

            wrapper.appendChild(label);
            wrapper.appendChild(input);
            wrapper.appendChild(removeButton);

            promptBuilder.appendChild(wrapper);
            promptPartId++;
        }

            document.getElementById('add-prompt').addEventListener('click', addCustomPromptInput);


        // Initialize predefined prompt parts
        const predefinedPromptParts = [
            { label: 'Comporte-se como um:', options: [ 'Advogado Proficiente', 'Agente Imobiliário Especialista', 'Analista de Dados Analítico', 'Analista de Negócios Perspicaz', 'Analista de Segurança Cibernética', 'Arquiteto Experiente', 'Assistente Social Compassivo', 'Banqueiro de Investimentos Experiente', 'Coach Executivo Profissional', 'Consultor Ambiental', 'Consultor Confiável', 'Contador Especialista', 'Desenvolvedor de Blockchain', 'Desenvolvedor de Realidade Virtual (VR)', 'Desenvolvedor de Software Habilidoso', 'Desenvolvedor Web Proficiente', 'Designer Gráfico Criativo', 'Economista Astuto', 'Engenheiro de Inteligência Artificial (IA)', 'Engenheiro Qualificado', 'Especialista em TI com Conhecimento em Tecnologia', 'Farmacêutico Profissional', 'Gerente de Marketing Competente', 'Gerente de Operações Experiente', 'Gerente de Projeto Competente', 'Gerente de Recursos Humanos Experiente', 'Hacker Ético', 'Instrutor de Fitness Certificado', 'Médico Habilidoso', 'Oficial de Privacidade de Dados', 'Pesquisador Dedicado', 'Pesquisador de Experiência do Usuário (UX)', 'Planejador de Eventos Estratégico', 'Professor Experiente', 'Psicólogo Licenciado', 'Repórter Jornalístico', 'Representante de Vendas Realizado', 'Scrum Master Ágil' ] },
            { label: 'Eu preciso de um:', options: ['Serviço', 'Conselho', 'Produto'] },
            { label: 'Você irá:', options: ['Realizar uma tarefa', 'Ajudar com um problema', 'Fornecer informação'] },
            { label: 'No processo, você deve:', options: ['Manter foco', 'Ser detalhista', 'Ser rápido'] },
            { label: 'Por favor:', options: ['Evite jargões', 'Seja claro', 'Use exemplos'] },
            { label: 'Insira o resultado final em um:', options: [ "texto puro", "formato bem estruturado", "Arquivo .docx (Word)", "JSON", "CSV", "HTML", "XML", "Markdown code", "PDF" ] },
            { label: 'Aqui está um exemplo:', options: [] }
            // Additional predefined parts...
        ];

        predefinedPromptParts.forEach(part => {
            promptBuilder.appendChild(createPromptPartDropdown(part.label, part.options, promptPartId++));
        });

        document.getElementById('generate-prompt').addEventListener('click', () => {
            const prompts = [];
              document.querySelectorAll('.grid').forEach(wrapper => {
                const label = wrapper.querySelector('label').textContent; // Get the label text
                const select = wrapper.querySelector('.prompt-part');
                const customInput = wrapper.querySelector('.custom-input');
                const value = select.value === 'custom' ? customInput.value : select.value;
                if (value) prompts.push(`${label} ${value}`); // Concatenate label with value
            });

            const finalPrompt_temp = prompts.join(', ').replace(/, $/, '').replace(/:/g, '').toLowerCase();

            const finalPrompt = finalPrompt_temp.charAt(0).toUpperCase() + finalPrompt_temp.slice(1).toLowerCase();


            console.log(finalPrompt)
            //const finalPrompt = prompts.join(' ');
            if (!finalPrompt) {
                alert('Por favor, preencha pelo menos uma parte do prompt.');
                return;
            }

    const generatedPrompts = document.getElementById('generated-prompts');
        generatedPrompts.innerHTML = `
            <div class="bg-white p-4 rounded shadow-md">
                <p class="generated-prompt-text">${finalPrompt}</p>
                <button class="copy-prompt bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mt-4 text-base	">
                    📋 Copiar para a Área de Transferência
                </button>
            </div>
        `;

        // Attach event listener to the copy button
        document.querySelector('.copy-prompt').addEventListener('click', function() {
            const text = document.querySelector('.generated-prompt-text').innerText;
            navigator.clipboard.writeText(text).then(() => {
                alert('Copiado para a área de transferência');
            }, err => {
                console.error('Erro ao copiar texto: ', err);
            });
        });
    });

    document.getElementById('prefillButton-1').addEventListener('click', function() {

        document.getElementById('prompt-part-0').value = 'Professor Experiente';
        document.getElementById('custom-input-0').style.display = 'none';
        document.getElementById('custom-input-0').value = '';


        document.getElementById('prompt-part-1').value = 'Conselho';
        document.getElementById('custom-input-1').style.display = 'none';
        document.getElementById('custom-input-1').value = '';


        document.getElementById('prompt-part-2').value = 'custom';
        document.getElementById('custom-input-2').style.display = '';
        document.getElementById('custom-input-2').value = 'Ajudar a construir um plano de aula de matemática para engajar alunos do sétimo ano do ensino fundamental no tema de equações do segundo grau';


        document.getElementById('prompt-part-3').value = 'Ser detalhista';
        document.getElementById('custom-input-3').style.display = 'none';
        document.getElementById('custom-input-3').value = '';


        document.getElementById('prompt-part-4').value = 'Use exemplos';
        document.getElementById('custom-input-4').style.display = 'none';
        document.getElementById('custom-input-4').value = '';


        document.getElementById('prompt-part-5').value = 'PDF';
        document.getElementById('custom-input-5').value = '';

        document.getElementById('custom-input-5').style.display = 'none';
        document.getElementById('custom-input-5').value = '';


        document.getElementById('custom-input-6').style.display = 'none';
        document.getElementById('custom-input-6').value = '';


    });



    document.getElementById('prefillButton-2').addEventListener('click', function() {

        document.getElementById('prompt-part-0').value = 'custom';
        document.getElementById('custom-input-0').style.display = '';
        document.getElementById('custom-input-0').value = 'Redator Profissional de SEO';

        document.getElementById('prompt-part-1').value = 'custom';
        document.getElementById('custom-input-1').style.display = '';
        document.getElementById('custom-input-1').value = 'postagem de blog otimizada';



        document.getElementById('prompt-part-2').value = 'custom';
        document.getElementById('custom-input-2').style.display = '';
        document.getElementById('custom-input-2').value = 'pesquisará palavras-chave e as incorporará naturalmente no conteúdo';


        document.getElementById('prompt-part-3').value = 'custom';
        document.getElementById('custom-input-3').style.display = '';
        document.getElementById('custom-input-3').value = 'se concentrar na legibilidade, relevância e colocação adequada das palavras-chave';


        document.getElementById('prompt-part-4').value = 'custom';
        document.getElementById('custom-input-4').style.display = '';
        document.getElementById('custom-input-4').value = 'evite o excesso de palavras-chave ou a superotimização';

        document.getElementById('prompt-part-5').value = 'formato bem estruturado';

        document.getElementById('prompt-part-6').value = 'custom';
        document.getElementById('custom-input-6').style.display = '';
        document.getElementById('custom-input-6').value = 'título "Top 10 Dicas para Escrita SEO Eficaz: Aumente a Visibilidade do Seu Conteúdo"';

    });


    document.getElementById('prefillButton-3').addEventListener('click', function() {

        document.getElementById('prompt-part-0').value = 'Instrutor de Fitness Certificado';
        document.getElementById('custom-input-0').style.display = 'none';

        document.getElementById('prompt-part-1').value = 'Serviço';
        document.getElementById('custom-input-1').style.display = 'none';


        document.getElementById('prompt-part-2').value = 'Fornecer informação';
        document.getElementById('custom-input-2').style.display = 'none';


        document.getElementById('prompt-part-3').value = 'Ser detalhista';
        document.getElementById('custom-input-3').style.display = 'none';



        document.getElementById('prompt-part-4').value = 'Seja claro';
        document.getElementById('custom-input-4').style.display = 'none';

        document.getElementById('prompt-part-5').value = 'Arquivo .docx (Word)';
        document.getElementById('custom-input-5').style.display = 'none';

        document.getElementById('prompt-part-6').value = 'custom';
        document.getElementById('custom-input-6').style.display = '';
        document.getElementById('custom-input-6').value = 'Planilha de treino para correr meus primeiro 5km em uma corrida de rua';


    });

      document.getElementById('prefillButton-clear').addEventListener('click', function() {

        document.getElementById('prompt-part-0').value = 'Opções';
        document.getElementById('prompt-part-1').value = 'Opções';
        document.getElementById('prompt-part-2').value = 'Opções';
        document.getElementById('prompt-part-3').value = 'Opções';
        document.getElementById('prompt-part-4').value = 'Opções';
        document.getElementById('prompt-part-5').value = 'Opções';
        document.getElementById('prompt-part-6').value = 'Opções';


        document.getElementById('custom-input-0').style.display = 'none';
        document.getElementById('custom-input-1').style.display = 'none';
        document.getElementById('custom-input-2').style.display = 'none';
        document.getElementById('custom-input-3').style.display = 'none';
        document.getElementById('custom-input-4').style.display = 'none';
        document.getElementById('custom-input-5').style.display = 'none';
        document.getElementById('custom-input-6').style.display = 'none';

        document.getElementById('custom-input-0').value = '';
        document.getElementById('custom-input-1').value = '';
        document.getElementById('custom-input-2').value = '';
        document.getElementById('custom-input-3').value = '';
        document.getElementById('custom-input-4').value = '';
        document.getElementById('custom-input-5').value = '';
        document.getElementById('custom-input-6').value = '';
    });

    const modal = document.getElementById('modal');
    const promptInfo = document.getElementById('promptInfo');
    const closeModal = document.getElementById('closeModal');

    promptInfo.onclick = function() {
        modal.classList.remove('hidden');
    }

    closeModal.onclick = function() {
        modal.classList.add('hidden');
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.classList.add('hidden');
        }
    }

});
