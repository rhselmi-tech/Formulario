// Variáveis globais para controlar contadores
let experienceCounter = 1;
let courseCounter = 1;

// debug helpers removed (restored clean behavior)

// Função para mostrar/ocultar campo da vaga
function toggleVagaField() {
    const vagaEspecifica = document.querySelector('input[name="vaga_especifica"]:checked');
    const vagaField = document.getElementById('vagaField');
    
    if (vagaEspecifica && vagaEspecifica.value === 'sim') {
        vagaField.style.display = 'block';
        document.getElementById('qual_vaga').required = true;
    } else {
        vagaField.style.display = 'none';
        document.getElementById('qual_vaga').required = false;
        document.getElementById('qual_vaga').value = '';
    }
}

// Função para mostrar/ocultar campo do parente
function toggleParenteField() {
    const parenteEmpresa = document.querySelector('input[name="parente_empresa"]:checked');
    const parenteField = document.getElementById('parenteField');
    
    if (parenteEmpresa && parenteEmpresa.value === 'sim') {
        parenteField.style.display = 'block';
        document.getElementById('nome_parente').required = true;
    } else {
        parenteField.style.display = 'none';
        document.getElementById('nome_parente').required = false;
        document.getElementById('nome_parente').value = '';
    }
}

// Função para mostrar/ocultar campo do pai
function togglePaiField() {
    const temPai = document.querySelector('input[name="tem_pai"]:checked');
    const paiField = document.getElementById('paiField');
    
    if (temPai && temPai.value === 'sim') {
        paiField.style.display = 'block';
        document.getElementById('nome_pai').required = true;
    } else {
        paiField.style.display = 'none';
        document.getElementById('nome_pai').required = false;
        document.getElementById('nome_pai').value = '';
    }
}

// Função para mostrar/ocultar campo da CNH
function toggleCnhField() {
    const possuiCnh = document.querySelector('input[name="possui_cnh"]:checked');
    const cnhField = document.getElementById('cnhField');
    
    if (possuiCnh && possuiCnh.value === 'sim') {
        cnhField.style.display = 'block';
        document.querySelector('select[name="categoria_cnh"]').required = true;
    } else {
        cnhField.style.display = 'none';
        document.querySelector('select[name="categoria_cnh"]').required = false;
        document.querySelector('select[name="categoria_cnh"]').value = '';
    }
}

// Função para mostrar/ocultar campo do veículo
function toggleVeiculoField() {
    const veiculoProprio = document.querySelector('input[name="veiculo_proprio"]:checked');
    const veiculoField = document.getElementById('veiculoField');
    
    if (veiculoProprio && veiculoProprio.value === 'sim') {
        veiculoField.style.display = 'block';
        document.querySelector('select[name="tipo_veiculo"]').required = true;
    } else {
        veiculoField.style.display = 'none';
        document.querySelector('select[name="tipo_veiculo"]').required = false;
        document.querySelector('select[name="tipo_veiculo"]').value = '';
    }
}

// Função para mostrar/ocultar campo de apartamento
function toggleApartamentoField() {
    const possui = document.getElementById('possui_apartamento');
    const aptField = document.getElementById('apartamentoField');

    if (possui && possui.checked) {
        aptField.style.display = 'block';
        document.getElementById('numero_apartamento').required = true;
    } else {
        aptField.style.display = 'none';
        const numApt = document.getElementById('numero_apartamento');
        if (numApt) {
            numApt.required = false;
            numApt.value = '';
        }
    }
}

// Máscaras para campos
function formatCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
}

function formatPhone(phone) {
    phone = phone.replace(/\D/g, '');
    phone = phone.replace(/(\d{2})(\d)/, '($1) $2');
    phone = phone.replace(/(\d{5})(\d)/, '$1-$2');
    return phone;
}

function formatPIS(pis) {
    pis = pis.replace(/\D/g, '');
    pis = pis.replace(/(\d{3})(\d)/, '$1.$2');
    pis = pis.replace(/(\d{5})(\d)/, '$1.$2');
    pis = pis.replace(/(\d{2})(\d{1})$/, '$1-$2');
    return pis;
}

// Aplicar máscaras aos campos
document.addEventListener('DOMContentLoaded', function() {
    const cpfField = document.getElementById('cpf');
    const whatsappField = document.getElementById('whatsapp');
    const telefoneField = document.getElementById('telefone');
    const pisField = document.getElementById('pis');

    if (cpfField) {
        cpfField.addEventListener('input', function(e) {
            e.target.value = formatCPF(e.target.value);
        });
    }

    if (whatsappField) {
        whatsappField.addEventListener('input', function(e) {
            e.target.value = formatPhone(e.target.value);
        });
    }

    if (telefoneField) {
        telefoneField.addEventListener('input', function(e) {
            e.target.value = formatPhone(e.target.value);
        });
    }

    if (pisField) {
        pisField.addEventListener('input', function(e) {
            e.target.value = formatPIS(e.target.value);
        });
    }
});

// Validação de CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    
    let soma = 0;
    let resto;
    
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
}

// Validação em tempo real
function setupValidation() {
    const form = document.getElementById('curriculumForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Validação básica de campo obrigatório
    if (field.required && !value) {
        isValid = false;
    }
    
    // Validações específicas
    if (field.id === 'cpf' && value) {
        isValid = validarCPF(value);
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    }
    
    // Aplicar classes de validação
    if (isValid) {
        field.classList.remove('invalid');
        field.classList.add('valid');
    } else {
        field.classList.remove('valid');
        field.classList.add('invalid');
    }
    
    return isValid;
}

// Função para limpar o formulário
function clearForm() {
    if (confirm('Tem certeza que deseja limpar todos os dados do formulário?')) {
        const form = document.getElementById('curriculumForm');
        form.reset();
        
        // Limpar classes de validação
        const fields = form.querySelectorAll('input, select, textarea');
        fields.forEach(field => {
            field.classList.remove('valid', 'invalid');
        });
        
        // Ocultar campos condicionais
        document.getElementById('vagaField').style.display = 'none';
        document.getElementById('parenteField').style.display = 'none';
        document.getElementById('cnhField').style.display = 'none';
        document.getElementById('veiculoField').style.display = 'none';
        
        // Remover required dos campos condicionais
        document.getElementById('qual_vaga').required = false;
        document.getElementById('nome_parente').required = false;
        document.querySelector('select[name="categoria_cnh"]').required = false;
        document.querySelector('select[name="tipo_veiculo"]').required = false;
        
        // Remover experiências e cursos adicionais (manter apenas os 3 primeiros)
        removeExtraItems('experience');
        removeExtraItems('course');
    }
}

// Função para coletar dados do formulário
function collectFormData() {
    const form = document.getElementById('curriculumForm');
    const data = {};
    

    // ---- Helpers para erros inline ----
    function clearInlineErrors(form) {
        if (!form) return;
        // remover mensagens de campo
        form.querySelectorAll('.field-error').forEach(el => el.remove());
        // remover banner de erro
        const banner = form.querySelector('.form-error-banner');
        if (banner) banner.remove();
        // remover classes invalid
        form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
    }

    function showInlineErrors(form, errors) {
        if (!form) return;
        // criar banner no topo do formulário
        const existing = form.querySelector('.form-error-banner');
        if (existing) existing.remove();

        if (!errors || errors.length === 0) return;

        const banner = document.createElement('div');
        banner.className = 'form-error-banner';
        const list = document.createElement('ol');
        errors.forEach(err => {
            const li = document.createElement('li');
            li.textContent = err.message || err.label || 'Campo inválido';
            list.appendChild(li);

            // se houver um elemento associado, inserir mensagem próxima a ele
            if (err.element) {
                try {
                    // localizar o container da label/input
                    const container = err.element.closest('.form-group') || err.element.parentElement;
                    if (container) {
                        const fieldErr = document.createElement('div');
                        fieldErr.className = 'field-error';
                        fieldErr.textContent = err.message || err.label || 'Campo inválido';
                        container.appendChild(fieldErr);
                    }
                    // marcar elemento como invalid para estilo
                    err.element.classList.add('invalid');
                } catch (e) {
                    console.warn('Erro ao anexar mensagem inline para', err, e);
                }
            }
        });

        banner.innerHTML = `<strong>Por favor corrija os itens abaixo:</strong>`;
        banner.appendChild(list);

        // inserir banner antes do form
        form.insertBefore(banner, form.firstChild);
    }

    // Coletar campo nome_completo diretamente
    const nomeField = document.getElementById('nome_completo');
    if (nomeField) {
        data.nome_completo = nomeField.value.trim();
    }

    // Coletar consentimentos (estado das caixas e texto dos dizeres)
    const consentStartCheckbox = document.getElementById('consent_start');
    const consentEndCheckbox = document.getElementById('consent_end');
    data.consent_start = !!(consentStartCheckbox && consentStartCheckbox.checked);
    data.consent_end = !!(consentEndCheckbox && consentEndCheckbox.checked);
    const consentStartTextEl = document.querySelector('#consentStartSection .consent-notice p');
    const consentEndTextEl = document.querySelector('#consentEndSection .consent-notice p');
    data.consent_start_text = consentStartTextEl ? consentStartTextEl.textContent.trim() : '';
    data.consent_end_text = consentEndTextEl ? consentEndTextEl.textContent.trim() : '';
    
    // Coletar outros campos importantes diretamente (INCLUINDO whatsapp)
    const fieldsToCollect = [
        'email', 'telefone', 'whatsapp', 'cpf', 'rg', 'cidade_rg', 'data_nascimento', 'pis', 
        'cidade_nascimento', 'estado_civil', 'tem_pai', 'nome_pai', 'nome_mae', 
        'escolaridade', 'vaga_especifica', 'qual_vaga',
        'parente_empresa', 'nome_parente', 'possui_cnh', 'categoria_cnh',
        'veiculo_proprio', 'tipo_veiculo', 'outras_informacoes',
        // novos campos de endereço
        'rua', 'numero_casa', 'bairro', 'cidade', 'possui_apartamento', 'numero_apartamento'
    ];
    
    fieldsToCollect.forEach(fieldName => {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (field) {
            if (field.type === 'radio') {
                const checkedRadio = document.querySelector(`[name="${fieldName}"]:checked`);
                if (checkedRadio) {
                    data[fieldName] = checkedRadio.value;
                }
            } else {
                data[fieldName] = field.value.trim(); // ADICIONADO .trim()
            }
        }
    });
    
    // Debug específico para WhatsApp
    console.log('=== DEBUG COLETA WHATSAPP ===');
    console.log('WhatsApp coletado:', data.whatsapp);
    const whatsappField = document.getElementById('whatsapp');
    console.log('Campo WhatsApp existe?', !!whatsappField);
    if (whatsappField) {
        console.log('Valor do campo WhatsApp:', whatsappField.value);
    }
    
    // Coletar disponibilidade (checkboxes)
    const disponibilidadeChecked = document.querySelectorAll('input[name="disponibilidade[]"]:checked');
    data.disponibilidade = Array.from(disponibilidadeChecked).map(cb => cb.value);
    
    // Organizar experiências em array
    const experiences = [];
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach((item, index) => {
        const id = item.id.split('-')[1];
        const empresa = form.querySelector(`[name="exp${id}_empresa"]`)?.value || '';
        const entrada = form.querySelector(`[name="exp${id}_entrada"]`)?.value || '';
        const saida = form.querySelector(`[name="exp${id}_saida"]`)?.value || '';
        const funcoes = form.querySelector(`[name="exp${id}_funcoes"]`)?.value || '';
        
        if (empresa || entrada || saida || funcoes) {
            experiences.push({
                numero: index + 1,
                empresa,
                entrada,
                saida,
                funcoes
            });
        }
    });
    
    // Organizar cursos em array
    const courses = [];
    const courseItems = document.querySelectorAll('.course-item');
    courseItems.forEach((item, index) => {
        const id = item.id.split('-')[1];
        const instituicao = form.querySelector(`[name="curso${id}_instituicao"]`)?.value || '';
        const nome = form.querySelector(`[name="curso${id}_nome"]`)?.value || '';
        const anoCarga = form.querySelector(`[name="curso${id}_ano_carga"]`)?.value || '';
        
        if (instituicao || nome || anoCarga) {
            courses.push({
                numero: index + 1,
                instituicao,
                nome,
                anoCarga
            });
        }
    });
    
    // Adicionar arrays organizados aos dados
    data.experiencias = experiences;
    data.cursos = courses;
    
    // Incluir quaisquer outros campos não enumerados explicitamente
    // (garante que informações adicionais preenchidas não sejam perdidas)
    const allFields = form.querySelectorAll('input[name], select[name], textarea[name]');
    allFields.forEach(field => {
        const name = field.getAttribute('name');
        if (!name) return;
        if (data.hasOwnProperty(name)) return; // já coletado

        if (field.type === 'checkbox') {
            // coletar múltiplos valores com mesmo name
            const checked = form.querySelectorAll(`input[name="${name}"]:checked`);
            data[name] = Array.from(checked).map(c => c.value);
        } else if (field.type === 'radio') {
            const checked = form.querySelector(`input[name="${name}"]:checked`);
            data[name] = checked ? checked.value : '';
        } else {
            data[name] = (field.value || '').toString().trim();
        }
    });

    return data;
}

// ---- Helpers de telefone para WhatsApp ----
function normalizePhoneForWhatsApp(raw) {
    if (!raw) throw new Error('Número não informado');
    const digits = raw.toString().replace(/\D/g, '');
    // considerar formatos comuns: com DDI 55 (Brasil) ou sem
    if (digits.length === 0) throw new Error('Número inválido');

    // aceitar se já tem DDI 55
    if (digits.startsWith('55') && digits.length >= 12) {
        return digits; // já com código do Brasil
    }

    // se tem 11 (9xxxxxxxx) ou 10 (8xxxxxxxx) dígitos, presumir Brasil e acrescentar 55
    if (digits.length === 11 || digits.length === 10) {
        return '55' + digits;
    }

    // se tem entre 12 e 15 dígitos e não começa com 55, aceitar como está (número internacional)
    if (digits.length >= 10 && digits.length <= 15) {
        return digits;
    }

    throw new Error('Número de telefone inválido. Use DDD + número, ex: (11) 9xxxx-xxxx');
}

function formatPhoneForDisplay(digits) {
    if (!digits) return '';
    // se começa com 55 -> formato Brasil
    if (digits.startsWith('55')) {
        const rest = digits.slice(2);
        const ddd = rest.slice(0,2);
        const num = rest.slice(2);
        if (num.length === 9) {
            return `+55 (${ddd}) ${num.slice(0,5)}-${num.slice(5)}`;
        }
        if (num.length === 8) {
            return `+55 (${ddd}) ${num.slice(0,4)}-${num.slice(4)}`;
        }
        // fallback genérico
        return `+55 ${rest}`;
    }

    // para outros DDIs, apenas inserir + e separar o restante
    return `+${digits}`;
}

// Função para criar mensagem formatada do WhatsApp
function createFormattedMessage(formData) {
    if (!formData) throw new Error('formData não fornecido');

    // Nome (prioriza formData, depois campo direto)
    let nome = (formData.nome_completo || '').toString().trim();
    if (!nome) {
        const nomeField = document.getElementById('nome_completo');
        nome = nomeField ? nomeField.value.trim() : '';
    }
    if (!nome) throw new Error('Nome é obrigatório para criar a mensagem');

    let message = `👋 *Olá! Sou ${nome} e gostaria de me candidatar para uma vaga no Pastifício Selmi*\n\n`;

    // Aviso inicial (consentimento do início) — incluir no topo do currículo
    const defaultConsentStart = `Selmi: Estou ciente de que o fornecimento das informações pessoais e profissionais solicitadas no presente formulario não implica, em hipótese alguma, garantia de contratação para a vaga pretendida.`;
    const consentStartText = (formData.consent_start_text && formData.consent_start_text.trim()) ? formData.consent_start_text.trim() : defaultConsentStart;
    message += `🛡️ *AVISO INICIAL*\n`;
    message += `• ${consentStartText}\n`;
    message += `  CIENTE: ${formData.consent_start ? 'Sim' : 'Não'}\n\n`;

    // Dados pessoais
    message += `👤 *DADOS PESSOAIS*\n`;
    message += `• Nome Completo: ${nome}\n`;
    if (formData.email) message += `✉️ Email: ${formData.email}\n`;
    if (formData.telefone) message += `📞 Telefone: ${formData.telefone}\n`;

    // WhatsApp (usar valor normalizado ou campo direto)
    if (formData.whatsapp) {
        message += `📱 WhatsApp: ${formData.whatsapp}\n`;
    } else {
        const whatsappField = document.getElementById('whatsapp');
        if (whatsappField && whatsappField.value.trim()) message += `📱 WhatsApp: ${whatsappField.value.trim()}\n`;
    }

    if (formData.endereco) message += `🏠 Endereço: ${formData.endereco}\n`;
    if (formData.cpf) message += `🆔 CPF: ${formData.cpf}\n`;
    if (formData.rg) {
        let rgInfo = formData.rg;
        if (formData.cidade_rg) rgInfo += ` - ${formData.cidade_rg}`;
        message += `🪪 RG: ${rgInfo}\n`;
    }
    if (formData.data_nascimento) message += `🎂 Data de Nascimento: ${formData.data_nascimento}\n`;
    if (formData.cidade_nascimento) message += `📍 Cidade de Nascimento: ${formData.cidade_nascimento}\n`;
    if (formData.estado_civil) message += `💍 Estado Civil: ${formData.estado_civil}\n`;
    if (formData.pis) message += `🧾 PIS: ${formData.pis}\n`;
    if (formData.tem_pai === 'sim' && formData.nome_pai) message += `👨‍👦 Nome do Pai: ${formData.nome_pai}\n`;
    else if (formData.tem_pai === 'nao') message += `👨‍👦 Nome do Pai: Não consta/Não tem\n`;
    if (formData.nome_mae) message += `👩‍👦 Nome da Mãe: ${formData.nome_mae}\n`;

    message += `\n`;

    // Montar endereço a partir dos campos separados, se existirem
    if (formData.rua || formData.numero_casa || formData.bairro || formData.cidade) {
        let enderecoParts = [];
        if (formData.rua) enderecoParts.push(formData.rua);
        if (formData.numero_casa) enderecoParts.push('nº ' + formData.numero_casa);
        if (formData.bairro) enderecoParts.push(formData.bairro);
        if (formData.cidade) enderecoParts.push(formData.cidade);
        let enderecoFormatado = enderecoParts.join(' - ');
        if (formData.possui_apartamento === 'sim' && formData.numero_apartamento) {
            enderecoFormatado += `, Apt ${formData.numero_apartamento}`;
        }
        message += `🏠 Endereço: ${enderecoFormatado}\n\n`;
    }

    // Vaga e escolaridade
    message += `🎯 *VAGA DE INTERESSE*\n`;
    if (formData.vaga_especifica === 'sim' && formData.qual_vaga) message += `• Vaga específica: ${formData.qual_vaga}\n`;
    else message += `• Qualquer vaga disponível\n`;
    message += `\n`;

    if (formData.escolaridade) {
        message += `🎓 *ESCOLARIDADE*\n`;
        message += `• ${formData.escolaridade}\n\n`;
    }

    // Experiências
    if (formData.experiencias && formData.experiencias.length > 0) {
        message += `💼 *EXPERIÊNCIAS PROFISSIONAIS*\n`;
        formData.experiencias.forEach((exp, index) => {
            message += `${index + 1}. ${exp.empresa || 'Empresa não informada'}\n`;
            if (exp.entrada || exp.saida) {
                message += `   Período: ${exp.entrada || 'Início não informado'} até ${exp.saida || 'Atual'}\n`;
            }
            if (exp.funcoes) message += `   Funções: ${exp.funcoes}\n`;
        });
        message += `\n`;
    }

    // Cursos
    if (formData.cursos && formData.cursos.length > 0) {
        message += `📚 *CURSOS E FORMAÇÃO ADICIONAL*\n`;
        formData.cursos.forEach((c, i) => {
            message += `${i + 1}. ${c.nome || c.instituicao || 'Curso não informado'}${c.anoCarga ? ' - ' + c.anoCarga : ''}\n`;
        });
        message += `\n`;
    }

    // Disponibilidade
    if (formData.disponibilidade && formData.disponibilidade.length > 0) {
        message += `⏱️ *DISPONIBILIDADE*\n`;
        message += `• ${formData.disponibilidade.join(', ')}\n\n`;
    }

    // Transporte e CNH
    if (formData.possui_cnh) {
        message += `🚗 *TRANSPORTE*\n`;
        message += `• Possui CNH: ${formData.possui_cnh}${formData.categoria_cnh ? ' - ' + formData.categoria_cnh : ''}\n`;
        if (formData.veiculo_proprio) message += `• Veículo próprio: ${formData.veiculo_proprio}${formData.tipo_veiculo ? ' - ' + formData.tipo_veiculo : ''}\n`;
        message += `\n`;
    }

    // Parente na empresa
    if (formData.parente_empresa === 'sim' && formData.nome_parente) {
        message += `• Parente/Conhecido na empresa: ${formData.nome_parente}\n\n`;
    }

    if (formData.outras_informacoes) {
        message += `🔎 Outras informações:\n${formData.outras_informacoes}\n\n`;
    }

    // Nota final
    // Final format requested by user: bold declaration, bullet with initial consent text, LGPD text and CIENTE statuses
    const defaultInitialConsent = 'Estou ciente de que o fornecimento das informações pessoais e profissionais solicitadas no presente formulario não implica, em hipótese alguma, garantia de contratação para a vaga pretendida.';
    const defaultLGPD = 'Reconheço que tais dados serão utilizados exclusivamente para fins de análise curricular e avaliação de compatibilidade com o perfil buscado pela empresa, permanecendo a decisão final de contratação a critério exclusivo da contratante, nos termos da Lei nº 13.709/2018 – LGPD.';

    const initialConsentText = formData.consent_start_text && formData.consent_start_text.trim() ? formData.consent_start_text.trim() : defaultInitialConsent;
    const lgpdConsentText = formData.consent_end_text && formData.consent_end_text.trim() ? formData.consent_end_text.trim() : defaultLGPD;

    message += `\n*Declaro que li e estou ciente das informações abaixo.*\n\n`;
    // bullet with initial consent text
    message += `- ${initialConsentText}\n\n`;
    // LGPD text
    message += `${lgpdConsentText}\n\n`;
    // Show CIENTE status for both
    message += `CIENTE (início): ${formData.consent_start ? 'Sim' : 'Não'}\n`;
    message += `CIENTE (final): ${formData.consent_end ? 'Sim' : 'Não'}\n`;

    return message;
}

// Handler simples e direto para submit: valida consentimentos, coleta dados, formata mensagem e redireciona ao WhatsApp do RH
function handleFormSubmit(event) {
    if (event && typeof event.preventDefault === 'function') event.preventDefault();

    const form = document.getElementById('curriculumForm');

    // Limpar erros visuais antigos
    form.querySelectorAll('.form-error-banner').forEach(el => el.remove());
    form.querySelectorAll('.field-error').forEach(el => el.remove());
    form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));

    // Helper: visibilidade
    function isVisible(el) {
        if (!el) return false;
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden' && el.offsetParent !== null;
    }

    // Estratégia mais simples e confiável: temporariamente remover required de campos ocultos,
    // usar validação nativa (checkValidity), e então restaurar os atributos required.
    const requiredFields = Array.from(form.querySelectorAll('[required]'));
    const hiddenRequired = [];
    requiredFields.forEach(f => {
        if (!isVisible(f)) {
            hiddenRequired.push({ el: f, required: true });
            f.removeAttribute('required');
        }
    });

    // agora usar validação nativa (só validará campos visíveis que ainda possuem required)
    const validNative = form.checkValidity();

    // restaurar required removidos
    hiddenRequired.forEach(h => h.el.setAttribute('required', ''));

    if (!validNative) {
        // deixar o browser mostrar mensagens nativas
        form.reportValidity();
        return false;
    }

    // Exigir consentimentos (após validação dos campos visíveis)
    const consentStart = document.getElementById('consent_start');
    const consentEnd = document.getElementById('consent_end');
    if (!consentStart || !consentStart.checked || !consentEnd || !consentEnd.checked) {
        alert('Você precisa marcar as caixas "CIENTE" no início e no final do formulário para prosseguir.');
        return false;
    }

    // Coletar dados e enviar
    const formData = collectFormData();
    let message;
    try { message = createFormattedMessage(formData); } catch (err) { alert('Erro ao preparar a mensagem: ' + (err.message || err)); return false; }

    const phoneNumber = '5519971238643';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    try { showLoadingState(true); } catch (e) {}
    try { window.location.href = url; } catch (e) { try { window.open(url, '_blank'); } catch (e2) {} }
    return true;
}

// Função para mostrar mensagem de sucesso
function showSuccessMessage() {
    // Mostrar banner de sucesso (sem esconder o formulário)
    const existing = document.querySelector('.success-banner');
    if (existing) existing.remove();

    const banner = document.createElement('div');
    banner.className = 'success-banner';
    banner.style.cssText = 'background:linear-gradient(135deg,#e8f5e8,#c8e6c8);border:2px solid #25d366;padding:16px;border-radius:10px;margin:12px 0;color:#114b2b;';
    banner.innerHTML = `<strong>✅ Currículo preparado.</strong> Abra o WhatsApp para finalizar o envio.`;

    const container = document.querySelector('.container');
    const header = document.querySelector('.header');
    container.insertBefore(banner, header.nextSibling);

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Função para mostrar estado de carregamento
function showLoadingState(isLoading) {
    const form = document.getElementById('curriculumForm');
    const submitBtn = form.querySelector('.btn-primary');
    
    if (isLoading) {
        form.classList.add('form-loading');
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Enviando...';
    } else {
        form.classList.remove('form-loading');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="whatsapp-icon">📱</span> Enviar Currículo';
    }
}

// Função para mostrar mensagem de erro
function showErrorMessage() {
    let errorMsg = document.querySelector('.error-message');
    if (!errorMsg) {
        errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        document.querySelector('.container').insertBefore(errorMsg, document.querySelector('.curriculum-form'));
    }
    
    errorMsg.innerHTML = `
        <strong>Erro!</strong> Ocorreu um problema ao enviar seu currículo. 
        Por favor, tente novamente.
    `;
    errorMsg.style.display = 'block';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setTimeout(() => {
        errorMsg.style.display = 'none';
    }, 5000);
}

// Função para adicionar nova experiência
function addExperience() {
    experienceCounter++;
    const container = document.getElementById('experienceContainer');
    
    const newExperience = document.createElement('div');
    newExperience.className = 'experience-item new-item';
    newExperience.id = `experience-${experienceCounter}`;
    
    newExperience.innerHTML = `
        <div class="item-header">
            <h3>Experiência ${experienceCounter}</h3>
            <button type="button" class="btn-remove" onclick="removeExperience(${experienceCounter})">
                <span class="minus-icon">×</span>
            </button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="exp${experienceCounter}_empresa">Nome da empresa</label>
                <input type="text" id="exp${experienceCounter}_empresa" name="exp${experienceCounter}_empresa" placeholder="Nome da empresa">
            </div>
            <div class="form-group">
                <label for="exp${experienceCounter}_entrada">Mês e ano de entrada</label>
                <input type="month" id="exp${experienceCounter}_entrada" name="exp${experienceCounter}_entrada">
            </div>
            <div class="form-group">
                <label for="exp${experienceCounter}_saida">Mês e ano de saída</label>
                <input type="month" id="exp${experienceCounter}_saida" name="exp${experienceCounter}_saida">
            </div>
        </div>
        <div class="form-group">
            <label for="exp${experienceCounter}_funcoes">Cargo e funções exercidas (mínimo 3)</label>
            <textarea id="exp${experienceCounter}_funcoes" name="exp${experienceCounter}_funcoes" placeholder="Descreva o cargo e pelo menos 3 funções que você exercia..."></textarea>
        </div>
    `;
    
    container.appendChild(newExperience);
    updateRemoveButtons('experience');
    
    // Configurar validação para os novos campos
    setupValidationForNewFields(newExperience);
    
    // Scroll para o novo item
    newExperience.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Função para remover experiência
function removeExperience(id) {
    const element = document.getElementById(`experience-${id}`);
    if (element) {
        element.remove();
        updateRemoveButtons('experience');
    }
}

// Função para adicionar novo curso
function addCourse() {
    courseCounter++;
    const container = document.getElementById('coursesContainer');
    
    const newCourse = document.createElement('div');
    newCourse.className = 'course-item new-item';
    newCourse.id = `course-${courseCounter}`;
    
    newCourse.innerHTML = `
        <div class="item-header">
            <h3>Curso Adicional ${courseCounter}</h3>
            <button type="button" class="btn-remove" onclick="removeCourse(${courseCounter})">
                <span class="minus-icon">×</span>
            </button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="curso${courseCounter}_instituicao">Nome da instituição</label>
                <input type="text" id="curso${courseCounter}_instituicao" name="curso${courseCounter}_instituicao" placeholder="Nome da instituição">
            </div>
            <div class="form-group">
                <label for="curso${courseCounter}_nome">Nome do curso</label>
                <input type="text" id="curso${courseCounter}_nome" name="curso${courseCounter}_nome" placeholder="Nome do curso">
            </div>
            <div class="form-group">
                <label for="curso${courseCounter}_ano_carga">Ano e carga horária</label>
                <input type="text" id="curso${courseCounter}_ano_carga" name="curso${courseCounter}_ano_carga" placeholder="Ex: 2023 - 40h">
            </div>
        </div>
    `;
    
    container.appendChild(newCourse);
    updateRemoveButtons('course');
    
    // Configurar validação para os novos campos
    setupValidationForNewFields(newCourse);
    
    // Scroll para o novo item
    newCourse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Função para remover curso
function removeCourse(id) {
    const element = document.getElementById(`course-${id}`);
    if (element) {
        element.remove();
        updateRemoveButtons('course');
    }
}

// Função para atualizar visibilidade dos botões de remover
function updateRemoveButtons(type) {
    const container = type === 'experience' ? 'experienceContainer' : 'coursesContainer';
    const items = document.getElementById(container).children;
    
    // Mostrar botões de remover apenas se houver mais de 1 item
    for (let i = 0; i < items.length; i++) {
        const removeBtn = items[i].querySelector('.btn-remove');
        if (removeBtn) {
            removeBtn.style.display = items.length > 1 ? 'flex' : 'none';
        }
    }
}

// Função para configurar validação em novos campos
function setupValidationForNewFields(container) {
    const inputs = container.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                validateField(this);
            }
        });
    });
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Setup da validação
    setupValidation();
    
    // Configurar submit do formulário
    const form = document.getElementById('curriculumForm');
    form.addEventListener('submit', handleFormSubmit);
    
    // Animação suave para seções
    const sections = document.querySelectorAll('.form-section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Inicializar botões de remover
    updateRemoveButtons('experience');
    updateRemoveButtons('course');
    
    console.log('Formulário de currículo inicializado com sucesso!');
});

// Função para salvar progresso no localStorage
function saveProgress() {
    const formData = collectFormData();
    localStorage.setItem('curriculum-progress', JSON.stringify(formData));
}

// Função para carregar progresso do localStorage
function loadProgress() {
    const savedData = localStorage.getItem('curriculum-progress');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            const form = document.getElementById('curriculumForm');
            
            Object.keys(data).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field) {
                    if (field.type === 'checkbox' || field.type === 'radio') {
                        if (Array.isArray(data[key])) {
                            data[key].forEach(value => {
                                const option = form.querySelector(`[name="${key}"][value="${value}"]`);
                                if (option) option.checked = true;
                            });
                        } else {
                            const option = form.querySelector(`[name="${key}"][value="${data[key]}"]`);
                            if (option) option.checked = true;
                        }
                    } else {
                        field.value = data[key];
                    }
                }
            });
            
            // Atualizar campos condicionais
            toggleVagaField();
            toggleParenteField();
            // Restaurar campo de apartamento conforme savedData
            toggleApartamentoField();
        } catch (e) {
            console.log('Erro ao carregar progresso salvo:', e);
        }
    }
}

// Função para remover itens extras ao limpar formulário
function removeExtraItems(type) {
    const container = type === 'experience' ? 'experienceContainer' : 'coursesContainer';
    const items = document.getElementById(container).children;
    
    // Remove todos os itens além do primeiro
    while (items.length > 1) {
        items[items.length - 1].remove();
    }
    
    // Resetar contador
    if (type === 'experience') {
        experienceCounter = 1;
    } else {
        courseCounter = 1;
    }
    
    updateRemoveButtons(type);
}

// Função para enviar diretamente para WhatsApp (sem PDF)
function sendToWhatsAppDirectly(formData) {
    console.log('=== INICIANDO ENVIO WHATSAPP ===');
    console.log('Dados recebidos:', formData);
    
    try {
        // Verificar se formData é válido
        if (!formData || typeof formData !== 'object') {
            throw new Error('Dados do formulário inválidos');
        }
        
        // Verificar se campos essenciais existem - validação mais robusta
        console.log('=== DEBUG VERIFICAÇÃO DADOS ESSENCIAIS ===');
        console.log('formData.nome_completo:', formData.nome_completo);
        console.log('formData.whatsapp:', formData.whatsapp);
        console.log('formData.telefone:', formData.telefone);
        console.log('formData.email:', formData.email);
        console.log('Tipo nome_completo:', typeof formData.nome_completo);
        
        // Verificação mais robusta do nome
        const nomeCompleto = formData.nome_completo;
        const nomeValido = nomeCompleto && 
                          typeof nomeCompleto === 'string' && 
                          nomeCompleto.trim().length > 0;
        
        console.log('Nome válido?', nomeValido);
        
        if (!nomeValido) {
            console.error('ERRO: Nome é obrigatório - valor recebido:', nomeCompleto);
            
            // Tentar pegar diretamente do campo se falhou na coleta
            const nomeField = document.getElementById('nome_completo');
            const nomeDirecto = nomeField ? nomeField.value.trim() : '';
            
            console.log('Tentativa direta do campo:', nomeDirecto);
            
            if (nomeDirecto && nomeDirecto.length > 0) {
                formData.nome_completo = nomeDirecto;
                console.log('Nome corrigido com valor direto:', nomeDirecto);
            } else {
                throw new Error('Nome é obrigatório');
            }
        }
        
        console.log('Preparando mensagem para WhatsApp...');
        
        // Criar mensagem formatada com todos os dados
        const whatsappMessage = createFormattedMessage(formData);
        
        // Verificar se a mensagem foi criada corretamente
        if (!whatsappMessage || whatsappMessage.trim() === '') {
            throw new Error('Erro ao criar mensagem formatada');
        }
        
        // Número do WhatsApp
        const phoneNumber = '5519971238643';
        
        // Criar URL do WhatsApp
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        console.log('=== DEBUG WHATSAPP ===');
        console.log('Nome do candidato:', formData.nome_completo);
        console.log('WhatsApp do candidato:', formData.whatsapp || 'Não informado');
        console.log('Telefone do candidato:', formData.telefone || 'Não informado');
        console.log('Número destino:', phoneNumber);
        console.log('Mensagem criada - tamanho:', whatsappMessage.length, 'caracteres');
        console.log('URL criada - tamanho:', whatsappURL.length, 'caracteres');
        
        // Verificar se a mensagem contém o WhatsApp do candidato
        const temWhatsAppNaMensagem = whatsappMessage.includes('WhatsApp:');
        console.log('Mensagem contém WhatsApp do candidato?', temWhatsAppNaMensagem);
        
        if (!temWhatsAppNaMensagem) {
            console.warn('⚠️ AVISO: WhatsApp do candidato não foi incluído na mensagem!');
            console.log('Verificando campos novamente...');
            console.log('formData.whatsapp:', formData.whatsapp);
            
            // Tentar pegar diretamente do campo
            const whatsappField = document.getElementById('whatsapp');
            const whatsappDireto = whatsappField ? whatsappField.value.trim() : '';
            console.log('WhatsApp direto do campo:', whatsappDireto);
        }
        
        // Verificar se URL não está muito longa (limite de segurança)
        if (whatsappURL.length > 8000) {
            console.warn('URL muito longa, pode causar problemas em alguns dispositivos');
        }
        
        // Detectar dispositivo com detecção aprimorada
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                         (navigator.maxTouchPoints && navigator.maxTouchPoints > 2) ||
                         window.innerWidth <= 768;
        
        console.log('=== DEBUG DISPOSITIVO ===');
        console.log('Dispositivo detectado:', isMobile ? 'Mobile' : 'Desktop');
        console.log('User Agent:', navigator.userAgent);
        console.log('Tamanho da tela:', window.innerWidth + 'x' + window.innerHeight);
        console.log('MaxTouchPoints:', navigator.maxTouchPoints);
        
        // Redirecionar para WhatsApp com tratamento específico por dispositivo
        console.log('Tentando abrir WhatsApp...');
        console.log('URL do WhatsApp (primeiros 200 chars):', whatsappURL.substring(0, 200) + '...');
        
        if (isMobile) {
            // Para mobile: usar abordagem mais direta e confiável
            console.log('MOBILE: Usando window.location.href direto');
            
            // Adicionar delay pequeno para garantir que a interface responda
            setTimeout(() => {
                try {
                    // Método mais confiável para mobile
                    window.location.href = whatsappURL;
                    console.log('✅ Mobile: Redirecionamento executado com sucesso');
                } catch (error) {
                    console.error('❌ Erro no redirecionamento mobile:', error);
                    // Fallback para mobile
                    try {
                        window.open(whatsappURL, '_self');
                        console.log('✅ Mobile: Fallback _self executado');
                    } catch (error2) {
                        console.error('❌ Erro no fallback mobile:', error2);
                        window.open(whatsappURL, '_blank');
                        console.log('✅ Mobile: Fallback _blank executado');
                    }
                }
            }, 100);
        } else {
            // Para desktop: abrir em nova aba
            console.log('DESKTOP: usando window.open _blank');
            try {
                window.open(whatsappURL, '_blank');
                console.log('✅ Desktop: Nova aba aberta com sucesso');
            } catch (error) {
                console.error('❌ Erro ao abrir nova aba desktop:', error);
                // Fallback para desktop
                window.location.href = whatsappURL;
                console.log('✅ Desktop: Fallback location.href executado');
            }
        }
        
        // Mostrar mensagem de sucesso após um pequeno delay
        setTimeout(() => {
            showSuccessMessage();
        }, 1000);
        
        // Adicionar fallback manual
        setTimeout(() => {
            console.log('Criando botão de fallback manual...');
            createManualWhatsAppButton(whatsappURL);
        }, 3000);
        
    } catch (error) {
        console.error('=== ERRO NO ENVIO WHATSAPP ===');
        console.error('Tipo do erro:', error.name);
        console.error('Mensagem:', error.message);
        console.error('Stack:', error.stack);
        console.error('Dados do formulário:', formData);
        
        // Remover estado de loading
        showLoadingState(false);
        
        // Criar mensagem de erro mais amigável
        let errorMessage = 'Ocorreu um problema ao preparar o envio.';
        
        if (error.message.includes('Nome é obrigatório')) {
            errorMessage = 'Por favor, preencha o campo Nome.';
        } else if (error.message.includes('Dados do formulário inválidos')) {
            errorMessage = 'Erro nos dados do formulário. Tente preencher novamente.';
        } else if (error.message.includes('criar mensagem formatada')) {
            errorMessage = 'Erro ao formatar a mensagem. Verifique os dados preenchidos.';
        } else {
            errorMessage = `Erro técnico: ${error.message}`;
        }
        
        // Mostrar erro para o usuário
        alert(`❌ Erro ao Enviar Currículo

${errorMessage}

🔧 Você pode:
1. Verificar se todos os campos obrigatórios estão preenchidos
2. Tentar novamente
3. Recarregar a página se o problema persistir

Se o erro continuar, entre em contato diretamente pelo WhatsApp: (19) 99712-3864`);
        
        // Não criar botão manual se não temos URL válida
        if (typeof whatsappURL !== 'undefined' && whatsappURL.length > 0) {
            createManualWhatsAppButton(whatsappURL);
        }
    }
}

// Modal de confirmação antes de abrir o WhatsApp (garante gesto do usuário)
function showWhatsAppConfirm(url, message) {
    // remover modal existente
    const existing = document.getElementById('whatsappConfirmModal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'whatsappConfirmModal';
    modal.style.cssText = `position: fixed; inset: 0; display:flex; align-items:center; justify-content:center; z-index:10001;`;

    const box = document.createElement('div');
    box.style.cssText = `background:white; padding:20px; max-width:720px; width:92%; border-radius:12px; box-shadow:0 8px 32px rgba(0,0,0,0.2); text-align:left;`;

    const header = document.createElement('h3');
    header.textContent = 'Confirmar Envio para WhatsApp';
    header.style.marginTop = '0';

    const p = document.createElement('p');
    p.style.whiteSpace = 'pre-wrap';
    p.style.maxHeight = '240px';
    p.style.overflow = 'auto';
    p.textContent = message.slice(0, 4000); // limitar comprimento

    const btnOpen = document.createElement('button');
    btnOpen.textContent = 'Abrir WhatsApp';
    btnOpen.style.cssText = 'background:#25d366;color:white;border:none;padding:12px 18px;border-radius:8px;font-weight:700;margin-right:10px;cursor:pointer;';
    btnOpen.onclick = function() {
        // detectar dispositivo
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                         (navigator.maxTouchPoints && navigator.maxTouchPoints > 2) ||
                         window.innerWidth <= 768;
        try {
            if (isMobile) window.location.href = url;
            else window.open(url, '_blank');
        } catch (e) {
            // fallback
            window.open(url, '_blank');
        }
        // fechar modal e mostrar sucesso
        modal.remove();
        try { showSuccessMessage(); } catch (e) { console.warn('Erro ao mostrar sucesso', e); }
    };

    const btnCopy = document.createElement('button');
    btnCopy.textContent = 'Copiar Link';
    btnCopy.style.cssText = 'background:#007bff;color:white;border:none;padding:12px 18px;border-radius:8px;font-weight:700;cursor:pointer;margin-right:10px;';
    btnCopy.onclick = function() {
        navigator.clipboard.writeText(url).then(() => alert('Link copiado! Cole no WhatsApp')).catch(() => alert(url));
    };

    const btnClose = document.createElement('button');
    btnClose.textContent = 'Fechar';
    btnClose.style.cssText = 'background:#6c757d;color:white;border:none;padding:10px 14px;border-radius:8px;cursor:pointer;';
    btnClose.onclick = function() { modal.remove(); };

    box.appendChild(header);
    box.appendChild(p);
    const actions = document.createElement('div');
    actions.style.cssText = 'margin-top:16px;display:flex;gap:10px;justify-content:flex-end;';
    actions.appendChild(btnOpen);
    actions.appendChild(btnCopy);
    actions.appendChild(btnClose);
    box.appendChild(actions);

    modal.appendChild(box);
    document.body.appendChild(modal);

    // scroll to modal
    modal.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Salvar progresso a cada mudança
document.addEventListener('DOMContentLoaded', function() {
    loadProgress();
    
    const form = document.getElementById('curriculumForm');
    form.addEventListener('input', saveProgress);
    form.addEventListener('change', saveProgress);
});

// Validação de consentimento: exigir os dois checkboxes "CIENTE" antes de permitir envio
function setupConsentValidation() {
    const form = document.getElementById('curriculumForm');
    if (!form) return;

    // criar mensagens de erro nas seções de consentimento
    const consentStart = document.getElementById('consentStartSection');
    const consentEnd = document.getElementById('consentEndSection');

    function showConsentError(section, message) {
        // remover erro existente
        const existing = section.querySelector('.consent-error');
        if (existing) existing.remove();

        const el = document.createElement('div');
        el.className = 'consent-error';
        el.textContent = message;
        section.appendChild(el);
    }

    function clearConsentError(section) {
        const existing = section.querySelector('.consent-error');
        if (existing) existing.remove();
    }

    // Em vez de interceptar o submit aqui (já fazemos validação centralizada no handleFormSubmit),
    // só reagimos a mudanças para limpar mensagens de erro visuais.
    const startBox = document.getElementById('consent_start');
    const endBox = document.getElementById('consent_end');
    if (startBox) startBox.addEventListener('change', () => clearConsentError(consentStart || form));
    if (endBox) endBox.addEventListener('change', () => clearConsentError(consentEnd || form));
}

// inicializar validação de consentimento junto com validação de campos
document.addEventListener('DOMContentLoaded', function() {
    setupValidation();
    setupConsentValidation();
});

