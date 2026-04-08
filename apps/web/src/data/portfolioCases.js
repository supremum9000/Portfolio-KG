const portfolioCaseIdList = [
  'fraud-detection',
  'ai-voice-assistant',
  'notification-service',
  'atm-consent-signing',
  'engineering-project-management',
  'engineering-management-oil-gas',
  'unified-information-space',
  'financial-management-project-planning',
  'engineering-data-document-management',
  'procurement-supply-chain',
  'bpmn-er-modeler'
];

const portfolioSectorIdList = ['all', 'telecom', 'fintech', 'construction', 'oil-gas', 'other'];

export const defaultPortfolioCaseId = portfolioCaseIdList[0];
export const defaultPortfolioSectorId = portfolioSectorIdList[0];

export const portfolioCaseIds = new Set(portfolioCaseIdList);
export const portfolioSectorIds = new Set(portfolioSectorIdList);

export const portfolioPageContent = {
  en: {
    metaTitle: 'Portfolio - Vladimir Belov',
    metaDescription:
      'Selected case studies by Vladimir Belov across telecom, fintech, industrial construction, and oil and gas covering antifraud, service design, engineering project management, ATM consent signing, and procurement systems.',
    title: 'Portfolio',
    description:
      'Selected case studies focused on requirements, analytical artifacts, architecture, and project documentation across telecom, fintech, and industrial construction.',
    menuTitle: 'Projects',
    sectors: {
      all: 'All',
      telecom: 'Telecom',
      fintech: 'Fintech',
      construction: 'Construction',
      'oil-gas': 'Oil & Gas',
      other: 'Modeling tools'
    },
    sections: {
      description: 'Project description',
      preparedArtifacts: 'Artifacts',
      technologies: 'Technologies',
      outcome: 'Results'
    }
  },
  ru: {
    metaTitle: 'Портфолио - Vladimir Belov',
    metaDescription:
      'Избранные кейсы Владимира Белова в телекоме, финтехе, промышленном строительстве и нефтегазе: антифрод, сервисы для телекома, управление инжиниринговыми проектами, подписание согласий в АТМ и система закупок.',
    title: 'Портфолио',
    description:
      'Избранные кейсы с фокусом на требованиях, аналитических артефактах, архитектуре и проектной документации для телекома, финтеха и промышленного строительства.',
    menuTitle: 'Проекты',
    sectors: {
      all: 'Все',
      telecom: 'Телеком',
      fintech: 'Финтех',
      construction: 'Строительство',
      'oil-gas': 'Нефтегаз',
      other: 'Инструменты моделирования'
    },
    sections: {
      description: 'Описание проекта',
      preparedArtifacts: 'Артефакты',
      technologies: 'Технологии',
      outcome: 'Результаты'
    }
  },
  kg: {
    metaTitle: 'Портфолио - Vladimir Belov',
    metaDescription:
      'Владимир Беловдун телекоммуникация, финтех, өнөр жай курулушу жана мунай-газ тармактарындагы тандалган кейстери: антифрод, сервис дизайны, инженердик долбоорлорду башкаруу, АТМда макулдук кол коюу жана сатып алуу системалары.',
    title: 'Портфолио',
    description:
      'Телекоммуникация, финтех жана өнөр жай курулушу боюнча талаптарга, аналитикалык артефакттарга, архитектурага жана долбоордук документтерге багытталган тандалган кейстер.',
    menuTitle: 'Долбоорлор',
    sectors: {
      all: 'Баары',
      telecom: 'Телекоммуникация',
      fintech: 'Финтех',
      construction: 'Курулуш',
      'oil-gas': 'Мунай жана газ',
      other: 'Моделдөө куралдары'
    },
    sections: {
      description: 'Долбоордун сүрөттөмөсү',
      preparedArtifacts: 'Артефакттар',
      technologies: 'Технологиялар',
      outcome: 'Натыйжалар'
    }
  }
};

export const portfolioCases = {
  en: [
    {
      id: 'fraud-detection',
      sectors: ['telecom'],
      title: 'Fraud Detection',
      company: 'Alfa-Mobile',
      role: 'Information Security Direction Analyst',
      contextLine: 'Alfa-Mobile · Systems & Business Analysis · Antifraud',
      summary:
        'Prepared analytical artifacts and requirements for a telecom antifraud initiative at the intersection of MVNO operations and the bank’s fraud prevention system, covering fraud scenarios, business-significant events, detection logic, and mitigation measures.',
      preparedArtifacts: [
        'Fraud scenario registry classified across five anomaly groups: behavioral, financial, contextual, technical, and client-related.',
        'Detection metrics, threshold values, and calculation approaches for fraud monitoring.',
        'Business-significant events, data sources, and control actions for MVNO-to-bank fraud prevention integration.',
        'AI fraud detection scenarios and requirements for the antifraud system.'
      ],
      technologies: ['Kafka', 'SS7', 'OCS Forward Fusion', 'DMS', 'IBM DataPower', 'SMS Center', 'REST'],
      outcome: [
        'Developed and implemented an antifraud system.',
        'Implemented integration with the bank’s fraud prevention system.',
        'Reduced fraud risks for clients and the company.'
      ]
    },
    {
      id: 'ai-voice-assistant',
      sectors: ['telecom'],
      title: 'AI Voice Assistant',
      company: 'Alfa-Mobile',
      role: 'Information Security Direction Analyst',
      contextLine: 'Alfa-Mobile · Systems & Business Analysis · Antifraud',
      summary:
        'Prepared requirements for an AI voice assistant for subscriber interactions, focusing on service scenarios and the analytical artifacts needed for further solution design.',
      preparedArtifacts: [
        'Functional requirements.',
        'Non-functional requirements.',
        'Customer journey maps (CJM).',
        'BPMN diagrams for service scenarios.'
      ],
      technologies: ['Just AI', 'Kafka', 'Keycloak', 'S3 MinIO', 'IBM DataPower', 'PostgreSQL', 'MongoDB', 'REST'],
      outcome: [
        'Implemented an AI voice assistant for subscriber interactions.'
      ]
    },
    {
      id: 'notification-service',
      sectors: ['telecom'],
      title: 'Notification Service',
      company: 'Alfa-Mobile',
      role: 'Information Security Direction Analyst',
      contextLine: 'Alfa-Mobile · Systems & Business Analysis · Antifraud',
      summary:
        'Prepared analytical artifacts for a notification service, with focus on communication scenarios, API description, and high-level architecture boundaries.',
      preparedArtifacts: [
        'Functional requirements.',
        'BPMN diagrams.',
        'REST API specification.',
        'C4 Level 1 architecture artifacts.'
      ],
      technologies: ['REST API', 'Go', 'Kafka', 'PostgreSQL', 'MongoDB', 'Microservices'],
      outcome: [
        'Developed and implemented a notification service.',
        'All notifications are handled through this service.'
      ]
    },
    {
      id: 'atm-consent-signing',
      sectors: ['fintech'],
      title: 'ATM Consent Signing',
      company: 'Innotech',
      role: 'Lead Systems Analyst',
      contextLine: 'Innotech · Systems & Business Analysis · Fintech',
      summary:
        'Prepared a full analytical package for signing credit bureau and related consents at ATMs, covering business justification, requirements, API design, data modeling, and risk analysis.',
      preparedArtifacts: [
        'Business case and economic effects.',
        'Business, functional, non-functional, and integration requirements.',
        'REST API design and data model artifacts, including class and ER diagrams.',
        'Risk description with financial impact calculation, mitigation measures, CJM, and MVP scope.'
      ],
      technologies: ['REST API', 'Java EE', 'PostgreSQL', 'Microservices'],
      outcome: [
        'Implemented credit bureau and related consent signing at ATMs.',
        'Improved loan issuance to bank clients.'
      ]
    },
    {
      id: 'engineering-project-management',
      sectors: ['construction'],
      title: 'Engineering Project Management',
      company: 'Mosinzhproekt',
      role: 'Lead Specialist',
      contextLine: 'Mosinzhproekt · Systems Analysis · Construction',
      summary:
        'Developed the target business architecture and requirements for an information system for engineering project management. Key system blocks: contract and project cost management, BDR/BDDS budgeting, project portfolio management, engineering data and document release control, resource management, schedule networks, and Oracle Primavera integration.',
      preparedArtifacts: [
        'Target business processes.',
        'Role model.',
        'Data model.',
        'Functional requirements for the information system.',
        'Test program and methodology.',
        'Implementation methodology.'
      ],
      technologies: ['Oracle Primavera', '1C PM'],
      outcome: [
        'Implemented an engineering project management and technical document control system.',
        'Implemented modules for contract management, budgeting, engineering data, resource management, and Oracle Primavera integration.'
      ]
    },
    {
      id: 'engineering-management-oil-gas',
      sectors: ['construction', 'oil-gas'],
      title: 'Engineering Project Management in Industrial Construction (Oil & Gas)',
      company: 'NIPIGAZ',
      role: 'Information Systems Architect',
      sectorLabel: 'Oil & Gas and Construction',
      contextLine: 'NIPIGAZ · Oil & Gas and Construction',
      summary:
        'Developed the architecture of an engineering project management system for oil and gas construction. Project goals: identify causes of construction delays, improve planning accuracy through a unified linked schedule (design documentation, material supply, construction), create a single materials and equipment database for end-to-end planning, improve contract obligation control, and improve BDR/BDDS accuracy to identify cash gaps.',
      preparedArtifacts: [
        'Functional requirements.',
        'System architecture.',
        'Integration requirements.',
        'Test program and methodology.'
      ],
      technologies: ['Oracle Primavera', '1C Accounting', '1C UH', '1C ERP', 'AVEVA PDMS', 'CAD systems', 'SOAP', 'MS SQL'],
      outcome: [
        'Implemented an engineering project management system with planning, budgeting, treasury, reference data management, contracts, acts, and integrations with adjacent systems.'
      ]
    },
    {
      id: 'unified-information-space',
      sectors: ['construction', 'oil-gas'],
      title: 'Unified Information Space for a Design Institute',
      company: 'VNIPIneft',
      role: 'Head of Unit',
      sectorLabel: 'Oil & Gas and Construction',
      contextLine: 'VNIPIneft · Oil & Gas and Construction',
      summary:
        'Analyzed first- and second-level processes and the current information landscape. Identified key problems: duplication of functions and data across systems, a large number of heterogeneous information systems, inconsistent information, and duplicate contradictory reports. Proposed process optimization, reengineering measures, and a strategy for creating a unified information space for the design institute.',
      preparedArtifacts: [
        'Project goals and charter.',
        'Budget model.',
        'System architecture.',
        'Business, functional, and non-functional requirements.',
        'Target processes, class diagrams, ER diagrams, and integration requirements.',
        'Screen forms, testing methodology, and implementation methodology.'
      ],
      technologies: ['MS SQL', 'JS', '1C ERP', 'Oracle Primavera', 'AutoCAD', 'Aveva PDMS', 'SOAP'],
      outcome: [
        'Created a unified information system for project management, resource management, and engineering document control.',
        'Implemented early-stage incident forecasting, risk management, and estimation of project cost and duration.',
        'Reduced project timelines and costs and improved project quality.',
        'The system was used by about 800 employees and handled about 450,000 files totaling 6 TB, with up to 90,000 transactions per month and peak throughput of 25 transactions per second.',
        'Built from scratch a development and support unit (6 employees) on the 1C platform with a structured delivery process: initiation, development, pilot operation, and production release.'
      ]
    },
    {
      id: 'financial-management-project-planning',
      sectors: ['construction', 'oil-gas'],
      title: 'Budgeting, Contracts, and Settlements in Engineering Projects',
      company: 'Giprovostokneft',
      role: 'Lead Software Engineer',
      sectorLabel: 'Oil & Gas and Construction',
      contextLine: 'Giprovostokneft · Oil & Gas and Construction',
      summary:
        'Developed and implemented systems for treasury, budgeting (BDR, BDDS, investment budget), financial control, and project planning in a design institute. Included controlling with automatic task generation, analytical reporting with debt forecasting and what-if analysis, and integrations with the corporate portal and Oracle Primavera.',
      preparedArtifacts: [
        'Treasury, cash flow budgeting, income and expense budgeting, and investment budget modules.',
        'Functional budgets for production, sales, payroll, investments, and credit lines.',
        'Multi-currency settlements, contract accounting, addenda tracking, and term control.',
        'Analytical reporting, debt forecasting, what-if analysis, and factor analysis.',
        'Project volume-calendar planning, subcontract work accounting, and calendar planning.',
        'Integrations with 1C ZUP, the corporate portal, and Oracle Primavera.'
      ],
      technologies: ['.NET C#', '1C Accounting', 'Intalev Corporate Finance', 'MS SQL', 'MS SharePoint', 'Oracle Primavera', 'SOAP'],
      outcome: [
        'Implemented a financial management and project planning system for about 1000 users.',
        'Reduced short-term loan debt and enterprise expenses. Improved settlement transparency, forecasting, and control of financial condition and risks.'
      ]
    },
    {
      id: 'engineering-data-document-management',
      sectors: ['construction'],
      title: 'Engineering Data Management and Engineering Document Control',
      company: 'Enter Engineering Russia',
      role: 'Systems Analyst',
      contextLine: 'Enter Engineering Russia · Systems Analysis · Construction',
      summary:
        'Prepared requirements and technical design artifacts for engineering data management and engineering document control in industrial construction based on Intergraph Hexagon.',
      preparedArtifacts: [
        'Technical design for engineering data management covering 1D, 2D, and 3D data.',
        'Requirements for technical document management.',
        'System scope for engineering document release and related engineering data flows.',
        'System landscape description for SDx as the engineering document management system.'
      ],
      technologies: ['Intergraph Hexagon SDx', 'Intergraph Hexagon SRD', 'CAD systems', 'REST'],
      outcome: [
        'Implemented an engineering document management and engineering data management system covering 1D, 2D, and 3D data.'
      ]
    },
    {
      id: 'procurement-supply-chain',
      sectors: ['construction'],
      title: 'Procurement & Supply Chain Management',
      company: 'Enter Engineering Russia',
      role: 'Systems Analyst',
      contextLine: 'Enter Engineering Russia · Systems Analysis · Construction',
      summary:
        'Prepared requirements and technical design artifacts for procurement, logistics, supply chain, and construction handover processes for industrial construction based on Smart Materials, Smart Reference Data, and 1C ERP USO.',
      preparedArtifacts: [
        'Requirements for procurement and logistics management.',
        'Requirements for construction work execution and handover to operations.',
        'Requirements for master and reference data management.',
        'System landscape description covering Smart Materials, Smart Reference Data, and 1C ERP USO.'
      ],
      technologies: ['Intergraph Hexagon', 'Smart Materials', 'Smart Reference Data', 'REST', 'SOAP', '1C ERP USO', 'Oracle DB'],
      outcome: [
        'Implemented a system for procurement, logistics, reference data management, and handover of construction objects to operations.'
      ]
    },
    {
      id: 'bpmn-er-modeler',
      sectors: ['other'],
      title: 'BPMN/ER Modeler',
      company: 'Personal project',
      role: 'Authorial tool',
      contextLine: 'Personal project · Other projects',
      summary:
        'Developed a local BPMN/ER Modeler: a BPMN editor based on BPMN.io (bpmn-js) and an ER editor built on a custom DSL based on DBML/dbdiagram.io syntax.',
      preparedArtifacts: [],
      technologies: [
        'BPMN.io (bpmn-js)',
        'DBML',
        'HTML',
        'CSS',
        'JavaScript',
        'SVG',
        'File System Access API',
        'Canvas API'
      ],
      outcome: [
        'Implemented a local tool for BPMN process modeling and ER diagrams.',
        'Combined process and data modeling in a single workspace without server-side infrastructure.'
      ]
    }
  ],
  ru: [
    {
      id: 'fraud-detection',
      sectors: ['telecom'],
      title: 'Антифрод',
      company: 'Alfa-Mobile',
      role: 'Аналитик направления информационной безопасности',
      contextLine: 'Alfa-Mobile · Системный и бизнес-анализ · Антифрод',
      summary:
        'Подготовил аналитические артефакты и требования для телеком-антифрод инициативы на стыке MVNO и банковской СПМ: сценарии фрода, бизнес-значимые события, логика детекции и меры митигации рисков.',
      preparedArtifacts: [
        'Реестр сценариев фрода с классификацией по пяти типам аномалий: поведенческим, финансовым, контекстным, техническим и клиентским.',
        'Метрики детекции, пороговые значения и подходы к расчету для мониторинга фрода.',
        'Бизнес-значимые события, источники данных и управляющие действия для взаимодействия MVNO и банковской СПМ.',
        'AI-сценарии выявления фрода и требования к системе антифрода.'
      ],
      technologies: ['Kafka', 'SS7', 'OCS Forward Fusion', 'DMS', 'IBM DataPower', 'SMS-центр', 'REST'],
      outcome: [
        'Разработана и внедрена антифрод-система.',
        'Реализована интеграция с банковской системой противодействия мошенничеству.',
        'Снижены риски фрода для клиентов и компании.'
      ]
    },
    {
      id: 'ai-voice-assistant',
      sectors: ['telecom'],
      title: 'AI-голосовой помощник',
      company: 'Alfa-Mobile',
      role: 'Аналитик направления информационной безопасности',
      contextLine: 'Alfa-Mobile · Системный и бизнес-анализ · Антифрод',
      summary:
        'Подготовил требования для AI-голосового помощника для взаимодействия с абонентами, с акцентом на сервисные сценарии и аналитические артефакты для дальнейшего проектирования решения.',
      preparedArtifacts: [
        'Функциональные требования.',
        'Нефункциональные требования.',
        'Карты клиентского пути (CJM).',
        'BPMN-схемы сервисных сценариев.'
      ],
      technologies: ['Just AI', 'Kafka', 'Keycloak', 'S3 MinIO', 'IBM DataPower', 'PostgreSQL', 'MongoDB', 'REST'],
      outcome: [
        'Внедрен AI-голосовой помощник для взаимодействия с абонентами.'
      ]
    },
    {
      id: 'notification-service',
      sectors: ['telecom'],
      title: 'Сервис нотификации',
      company: 'Alfa-Mobile',
      role: 'Аналитик направления информационной безопасности',
      contextLine: 'Alfa-Mobile · Системный и бизнес-анализ · Антифрод',
      summary:
        'Подготовил аналитические артефакты для сервиса нотификации с фокусом на коммуникационных сценариях, описании API и высокоуровневых архитектурных границах.',
      preparedArtifacts: [
        'Функциональные требования.',
        'BPMN-схемы.',
        'Спецификация REST API.',
        'Архитектурные артефакты C4 Level 1.'
      ],
      technologies: ['REST API', 'Go', 'Kafka', 'PostgreSQL', 'MongoDB', 'Микросервисы'],
      outcome: [
        'Разработан и внедрен сервис нотификации.',
        'Все нотификации происходят через этот сервис.'
      ]
    },
    {
      id: 'atm-consent-signing',
      sectors: ['fintech'],
      title: 'Подписание согласий в АТМ',
      company: 'Иннотех',
      role: 'Главный системный аналитик',
      contextLine: 'Иннотех · Системный и бизнес-анализ · Финтех',
      summary:
        'Подготовил полный аналитический пакет для проекта подписания согласий БКИ и других согласий в АТМ: от бизнес-обоснования и требований до API, модели данных и описания рисков.',
      preparedArtifacts: [
        'Бизнес-кейс и экономические эффекты.',
        'Бизнес-, функциональные, нефункциональные и интеграционные требования.',
        'Проектирование REST API и артефакты модели данных, включая диаграммы классов и ER-диаграммы.',
        'Описание рисков с расчетом финансовых последствий, мерами митигации, CJM и границами MVP.'
      ],
      technologies: ['REST API', 'Java EE', 'PostgreSQL', 'Микросервисы'],
      outcome: [
        'Реализовано подписание согласий БКИ и других согласий в АТМ.',
        'Повысилась выдача кредитов клиентам банка.'
      ]
    },
    {
      id: 'engineering-project-management',
      sectors: ['construction'],
      title: 'Управление инжиниринговыми проектами',
      company: 'Мосинжпроект',
      role: 'Главный специалист',
      contextLine: 'Мосинжпроект · Системный анализ · Строительство',
      summary:
        'Разработал целевую бизнес-архитектуру и требования к информационной системе управления инжиниринговыми проектами. Основные блоки системы: управление договорами и затратами проекта, бюджетирование БДР/БДДС, управление портфелем проектов, инженерными данными и выпуском документации, управление ресурсами, календарно-сетевые графики и интеграция с Oracle Primavera.',
      preparedArtifacts: [
        'Целевые бизнес-процессы.',
        'Ролевая модель.',
        'Модель данных.',
        'Функциональные требования к информационной системе.',
        'Программа и методика испытаний.',
        'Методика внедрения.'
      ],
      technologies: ['Oracle Primavera', '1С PM'],
      outcome: [
        'Внедрена система управления инжиниринговыми проектами и техническим документооборотом.',
        'Реализованы блоки управления договорами, бюджетами, инженерными данными, ресурсами и интеграцией с Oracle Primavera.'
      ]
    },
    {
      id: 'engineering-management-oil-gas',
      sectors: ['construction', 'oil-gas'],
      title: 'Управление инжиниринговыми проектами в промышленном строительстве (нефть, газ)',
      company: 'НИПИгазпереработка',
      role: 'Архитектор информационных систем',
      sectorLabel: 'Нефтегаз и строительство',
      contextLine: 'НИПИгазпереработка · Нефтегаз и строительство',
      summary:
        'Разработал архитектуру системы управления инжиниринговыми проектами для нефтегазового строительства. Цели проекта: выявление причин срывов сроков строительных работ, повышение точности планирования за счет единого связанного графика (проектная документация, поставки, строительство), создание единой базы МТР для сквозного планирования, повышение контроля договорных обязательств, повышение точности БДР/БДДС и выявление кассовых разрывов.',
      preparedArtifacts: [
        'Функциональные требования.',
        'Архитектура системы.',
        'Интеграционные требования.',
        'Программа и методика испытаний.'
      ],
      technologies: ['Oracle Primavera', '1С Бухгалтерия', '1С УХ', '1С ERP', 'AVEVA PDMS', 'CAD-системы', 'SOAP', 'MS SQL'],
      outcome: [
        'Внедрена система управления инжиниринговыми проектами, реализованы планирование, бюджетирование, казначейство, управление НСИ, договорами, актами и интеграции со смежными системами.'
      ]
    },
    {
      id: 'unified-information-space',
      sectors: ['construction', 'oil-gas'],
      title: 'Единое информационное пространство проектного института',
      company: 'ВНИПИнефть',
      role: 'Руководитель сектора',
      sectorLabel: 'Нефтегаз и строительство',
      contextLine: 'ВНИПИнефть · Нефтегаз и строительство',
      summary:
        'Провел анализ процессов первого и второго уровня и текущего информационного ландшафта компании. Выявил ключевые проблемы: дублирование функций и данных в различных системах, большое количество разнородных информационных систем, противоречивая информация и дублирующие отчеты. Предложил меры по оптимизации и реинжинирингу процессов, а также стратегию создания единого информационного пространства проектного института.',
      preparedArtifacts: [
        'Цели и устав проекта.',
        'Бюджетная модель.',
        'Архитектура системы.',
        'Бизнес-, функциональные и нефункциональные требования.',
        'Целевые процессы, диаграммы классов, ER-диаграммы и интеграционные требования.',
        'Экранные формы, методика тестирования и методика внедрения.'
      ],
      technologies: ['MS SQL', 'JS', '1С ERP', 'Oracle Primavera', 'AutoCAD', 'Aveva PDMS', 'SOAP'],
      outcome: [
        'Создана единая информационная система управления проектами, ресурсами и инженерным документооборотом.',
        'Реализованы прогнозирование инцидентов на ранней стадии, управление рисками и оценка стоимости и длительности проектных работ.',
        'Сокращены сроки и стоимость проектов, повышено качество проектных работ.',
        'Системой пользовались около 800 сотрудников; обрабатывалось около 450000 файлов общим объемом 6 ТБ, до 90000 транзакций в месяц при пиковой производительности 25 транзакций в секунду.',
        'Создал «с нуля» сектор разработки и сопровождения (6 сотрудников) на платформе 1С со структурированным процессом поставки: инициация, разработка, опытная эксплуатация и выпуск в продуктив.'
      ]
    },
    {
      id: 'financial-management-project-planning',
      sectors: ['construction', 'oil-gas'],
      title: 'Управление бюджетированием, договорами и взаиморасчетами в инжиниринговых проектах',
      company: 'Гипровостокнефть',
      role: 'Ведущий инженер-программист',
      sectorLabel: 'Нефтегаз и строительство',
      contextLine: 'Гипровостокнефть · Нефтегаз и строительство',
      summary:
        'Разработал и внедрил системы для казначейства, бюджетирования (БДР, БДДС, инвестиционный бюджет), финансового контроля и проектного планирования в проектном институте. Включая контроллинг с автоматической генерацией задач, аналитическую отчетность с прогнозированием задолженности и анализом «что если», а также интеграции с корпоративным порталом и Oracle Primavera.',
      preparedArtifacts: [
        'Модули казначейства, БДДС, БДР и инвестиционного бюджета.',
        'Функциональные бюджеты по производству, реализации, заработной плате, инвестициям и кредитным линиям.',
        'Многовалютные взаиморасчеты, учет договоров и дополнительных соглашений, контроль изменений, сроков и условий.',
        'Аналитическая отчетность, прогнозирование задолженности, анализ «что если» и факторный анализ.',
        'Объемно-календарное планирование по проектам, учет субподрядных работ и календарное планирование.',
        'Интеграции с 1С ЗУП, корпоративным порталом и Oracle Primavera.'
      ],
      technologies: ['.NET C#', '1С Бухгалтерия', 'Инталев Корпоративные финансы', 'MS SQL', 'MS SharePoint', 'Oracle Primavera', 'SOAP'],
      outcome: [
        'Внедрена система финансового управления и проектного планирования примерно для 1000 пользователей.',
        'Сокращена краткосрочная кредитная задолженность и расходы предприятия. Повышена прозрачность расчетов, улучшены прогнозирование и контроль финансового состояния и рисков.'
      ]
    },
    {
      id: 'engineering-data-document-management',
      sectors: ['construction'],
      title: 'Управление инженерными данными и инженерный документооборот',
      company: 'Энтер Инжиниринг Россия',
      role: 'Системный аналитик',
      contextLine: 'Энтер Инжиниринг Россия · Системный анализ · Строительство',
      summary:
        'Подготовил требования и артефакты технического проекта по управлению инженерными данными и инженерному документообороту в промышленном строительстве на базе Intergraph Hexagon.',
      preparedArtifacts: [
        'Технический проект по управлению инженерными данными, включая 1D, 2D и 3D данные.',
        'Требования по техническому документообороту.',
        'Системные границы решения по выпуску инженерной документации и связанным потокам инженерных данных.',
        'Описание системного ландшафта для SDx как системы инженерного документооборота.'
      ],
      technologies: ['Intergraph Hexagon SDx', 'Intergraph Hexagon SRD', 'CAD-системы', 'REST'],
      outcome: [
        'Внедрена система управления инженерным документооборотом и инженерными данными 1D, 2D и 3D.'
      ]
    },
    {
      id: 'procurement-supply-chain',
      sectors: ['construction'],
      title: 'Управление закупками и цепочками поставок',
      company: 'Энтер Инжиниринг Россия',
      role: 'Системный аналитик',
      contextLine: 'Энтер Инжиниринг Россия · Системный анализ · Строительство',
      summary:
        'Подготовил требования и артефакты технического проекта для управления закупками, логистикой, цепочками поставок и передачей в эксплуатацию в промышленном строительстве на базе Smart Materials, Smart Reference Data и 1C ERP УСО.',
      preparedArtifacts: [
        'Требования по управлению закупками и логистикой.',
        'Требования по управлению производством строительных работ и передаче в эксплуатацию.',
        'Требования по управлению нормативно-справочной информацией.',
        'Описание системного ландшафта: Smart Materials, Smart Reference Data и 1C ERP УСО.'
      ],
      technologies: ['Intergraph Hexagon', 'Smart Materials', 'Smart Reference Data', 'REST', 'SOAP', '1C ERP УСО', 'Oracle DB'],
      outcome: [
        'Реализована система управления закупками, логистикой, НСИ и передачи строительных объектов в эксплуатацию.'
      ]
    },
    {
      id: 'bpmn-er-modeler',
      sectors: ['other'],
      title: 'BPMN/ER Modeler',
      company: 'Личный проект',
      role: 'Авторский инструмент',
      contextLine: 'Личный проект · Прочие проекты',
      summary:
        'Разработал локальный BPMN/ER Modeler: BPMN-редактор на базе BPMN.io (bpmn-js) и ER-редактор на собственном DSL, основанном на синтаксисе DBML/dbdiagram.io.',
      preparedArtifacts: [],
      technologies: [
        'BPMN.io (bpmn-js)',
        'DBML',
        'HTML',
        'CSS',
        'JavaScript',
        'SVG',
        'File System Access API',
        'Canvas API'
      ],
      outcome: [
        'Реализован локальный инструмент для моделирования BPMN-процессов и ER-диаграмм.',
        'Объединена работа с процессными и дата-моделями в одном рабочем пространстве без серверной инфраструктуры.'
      ]
    }
  ],
  kg: [
    {
      id: 'fraud-detection',
      sectors: ['telecom'],
      title: 'Антифрод',
      company: 'Alfa-Mobile',
      role: 'Маалымат коопсуздугу багытынын аналитиги',
      contextLine: 'Alfa-Mobile · Системдик жана бизнес-анализ · Антифрод',
      summary:
        'MVNO операциялары менен банктын алдамчылыкка каршы системасынын кесилишинде телекоммуникация антифрод демилгеси үчүн аналитикалык артефакттарды жана талаптарды даярдадым: алдамчылык сценарийлери, бизнес үчүн маанилүү окуялар, аныктоо логикасы жана тобокелдиктерди азайтуу чаралары.',
      preparedArtifacts: [
        'Беш аномалия тобу боюнча классификацияланган алдамчылык сценарийлеринин реестри: жүрүм-турум, финансылык, контексттик, техникалык жана кардарларга тиешелүү.',
        'Алдамчылыкты мониторингдөө үчүн аныктоо көрсөткүчтөрү, чек маанилери жана эсептөө ыкмалары.',
        'MVNO жана банктын алдамчылыкка каршы системасын интеграциялоо үчүн бизнес үчүн маанилүү окуялар, маалымат булактары жана башкаруу аракеттери.',
        'AI антифрод сценарийлери жана антифрод системасына коюлуучу талаптар.'
      ],
      technologies: ['Kafka', 'SS7', 'OCS Forward Fusion', 'DMS', 'IBM DataPower', 'SMS Center', 'REST'],
      outcome: [
        'Антифрод системасы иштелип чыгып, ишке киргизилди.',
        'Банктын алдамчылыкка каршы системасы менен интеграция ишке ашырылды.',
        'Кардарлар жана компания үчүн алдамчылык тобокелдиктери азайтылды.'
      ]
    },
    {
      id: 'ai-voice-assistant',
      sectors: ['telecom'],
      title: 'AI үн жардамчысы',
      company: 'Alfa-Mobile',
      role: 'Маалымат коопсуздугу багытынын аналитиги',
      contextLine: 'Alfa-Mobile · Системдик жана бизнес-анализ · Антифрод',
      summary:
        'Абоненттер менен байланышуу үчүн AI үн жардамчысына талаптарды даярдадым, кызмат сценарийлерине жана чечимди андан ары долбоорлоо үчүн зарыл аналитикалык артефакттарга басым жасадым.',
      preparedArtifacts: [
        'Функционалдык талаптар.',
        'Функционалдык эмес талаптар.',
        'Кардар жолунун карталары (CJM).',
        'Кызмат сценарийлери үчүн BPMN диаграммалары.'
      ],
      technologies: ['Just AI', 'Kafka', 'Keycloak', 'S3 MinIO', 'IBM DataPower', 'PostgreSQL', 'MongoDB', 'REST'],
      outcome: [
        'Абоненттер менен байланышуу үчүн AI үн жардамчысы ишке киргизилди.'
      ]
    },
    {
      id: 'notification-service',
      sectors: ['telecom'],
      title: 'Билдирүү кызматы',
      company: 'Alfa-Mobile',
      role: 'Маалымат коопсуздугу багытынын аналитиги',
      contextLine: 'Alfa-Mobile · Системдик жана бизнес-анализ · Антифрод',
      summary:
        'Билдирүү кызматы үчүн аналитикалык артефакттарды даярдадым, коммуникация сценарийлерине, API сүрөттөмөсүнө жана жогорку деңгээлдеги архитектуралык чек араларга басым жасадым.',
      preparedArtifacts: [
        'Функционалдык талаптар.',
        'BPMN диаграммалары.',
        'REST API спецификациясы.',
        'C4 Level 1 архитектуралык артефакттар.'
      ],
      technologies: ['REST API', 'Go', 'Kafka', 'PostgreSQL', 'MongoDB', 'Microservices'],
      outcome: [
        'Билдирүү кызматы иштелип чыгып, ишке киргизилди.',
        'Бардык билдирүүлөр ушул кызмат аркылуу ишке ашырылат.'
      ]
    },
    {
      id: 'atm-consent-signing',
      sectors: ['fintech'],
      title: 'АТМда макулдукка кол коюу',
      company: 'Innotech',
      role: 'Жетектөөчү системдик аналитик',
      contextLine: 'Innotech · Системдик жана бизнес-анализ · Финтех',
      summary:
        'АТМдарда кредиттик бюро жана тиешелүү макулдуктарга кол коюу үчүн толук аналитикалык пакетти даярдадым: бизнес негиздөө, талаптар, API дизайны, маалыматтар модели жана тобокелдиктерди анализдөөнү камтыйт.',
      preparedArtifacts: [
        'Бизнес-кейс жана экономикалык натыйжалар.',
        'Бизнес, функционалдык, функционалдык эмес жана интеграциялык талаптар.',
        'REST API дизайны жана маалыматтар моделинин артефакттары, анын ичинде класс жана ER диаграммалары.',
        'Финансылык таасирди эсептөө, тобокелдиктерди азайтуу чаралары, CJM жана MVP чек аралары менен тобокелдиктердин сүрөттөмөсү.'
      ],
      technologies: ['REST API', 'Java EE', 'PostgreSQL', 'Microservices'],
      outcome: [
        'АТМдарда кредиттик бюро жана тиешелүү макулдуктарга кол коюу ишке киргизилди.',
        'Банктын кардарларына кредит берүү жакшырды.'
      ]
    },
    {
      id: 'engineering-project-management',
      sectors: ['construction'],
      title: 'Инженердик долбоорлорду башкаруу',
      company: 'Mosinzhproekt',
      role: 'Жетектөөчү адис',
      contextLine: 'Mosinzhproekt · Системдик анализ · Курулуш',
      summary:
        'Инженердик долбоорлорду башкаруу маалымат системасы үчүн максаттуу бизнес-архитектураны жана талаптарды иштеп чыктым. Системанын негизги блоктору: келишимдерди жана долбоордун чыгашаларын башкаруу, БДР/БДДС бюджеттештирүү, долбоорлор портфелин башкаруу, инженердик маалыматтар жана документтерди чыгарууну контролдоо, ресурстарды башкаруу, календардык-тармак графиктери жана Oracle Primavera интеграциясы.',
      preparedArtifacts: [
        'Максаттуу бизнес-процесстер.',
        'Ролдук модель.',
        'Маалыматтар модели.',
        'Маалымат системасына функционалдык талаптар.',
        'Сыноо программасы жана методикасы.',
        'Ишке киргизүү методикасы.'
      ],
      technologies: ['Oracle Primavera', '1C PM'],
      outcome: [
        'Инженердик долбоорлорду башкаруу жана техникалык документ жүгүртүү системасы ишке киргизилди.',
        'Келишимдерди, бюджеттерди, инженердик маалыматтарды, ресурстарды башкаруу жана Oracle Primavera интеграциясы модулдары ишке ашырылды.'
      ]
    },
    {
      id: 'engineering-management-oil-gas',
      sectors: ['construction', 'oil-gas'],
      title: 'Өнөр жай курулушунда инженердик долбоорлорду башкаруу (мунай жана газ)',
      company: 'NIPIGAZ',
      role: 'Маалымат системаларынын архитектору',
      sectorLabel: 'Мунай-газ жана курулуш',
      contextLine: 'NIPIGAZ · Мунай-газ жана курулуш',
      summary:
        'Мунай-газ курулушу үчүн инженердик долбоорлорду башкаруу системасынын архитектурасын иштеп чыктым. Долбоордун максаттары: курулуш иштеринин кечигүү себептерин аныктоо, бирдиктүү байланышкан график аркылуу пландоонун тактыгын жогорулатуу (долбоордук документтер, жеткирүү, курулуш), башынан аягына чейин пландоо үчүн бирдиктүү материалдар жана жабдуулар базасын түзүү, келишим милдеттенмелеринин контролун жакшыртуу, БДР/БДДС тактыгын жогорулатуу жана акча агымындагы үзүлүүлөрдү аныктоо.',
      preparedArtifacts: [
        'Функционалдык талаптар.',
        'Системанын архитектурасы.',
        'Интеграциялык талаптар.',
        'Сыноо программасы жана методикасы.'
      ],
      technologies: ['Oracle Primavera', '1C Accounting', '1C UH', '1C ERP', 'AVEVA PDMS', 'CAD systems', 'SOAP', 'MS SQL'],
      outcome: [
        'Инженердик долбоорлорду башкаруу системасы ишке киргизилди, пландоо, бюджеттештирүү, казыначылык, НСМди башкаруу, келишимдер, актылар жана чектеш системалар менен интеграциялар ишке ашырылды.'
      ]
    },
    {
      id: 'unified-information-space',
      sectors: ['construction', 'oil-gas'],
      title: 'Долбоорлоо институту үчүн бирдиктүү маалымат мейкиндиги',
      company: 'VNIPIneft',
      role: 'Бөлүм башчысы',
      sectorLabel: 'Мунай-газ жана курулуш',
      contextLine: 'VNIPIneft · Мунай-газ жана курулуш',
      summary:
        'Биринчи жана экинчи деңгээлдеги процесстерди жана учурдагы маалыматтык ландшафтты анализдедим. Негизги маселелерди аныктадым: ар кандай системаларда функциялардын жана маалыматтардын кайталанышы, сан жагынан көп ар түрдүү маалымат системалары, карама-каршы маалыматтар жана кайталанган отчеттор. Процесстерди оптималдаштыруу жана реинжиниринг чараларын, ошондой эле долбоорлоо институту үчүн бирдиктүү маалымат мейкиндигин түзүү стратегиясын сунуштадым.',
      preparedArtifacts: [
        'Долбоордун максаттары жана уставы.',
        'Бюджеттик модель.',
        'Системанын архитектурасы.',
        'Бизнес, функционалдык жана функционалдык эмес талаптар.',
        'Максаттуу процесстер, класс диаграммалары, ER диаграммалары жана интеграциялык талаптар.',
        'Экран формалары, сыноо методикасы жана ишке киргизүү методикасы.'
      ],
      technologies: ['MS SQL', 'JS', '1C ERP', 'Oracle Primavera', 'AutoCAD', 'Aveva PDMS', 'SOAP'],
      outcome: [
        'Долбоорлорду, ресурстарды жана инженердик документ жүгүртүүнү башкаруу үчүн бирдиктүү маалымат системасы түзүлдү.',
        'Эрте стадияда инциденттерди болжолдоо, тобокелдиктерди башкаруу жана долбоор иштеринин наркын жана мөөнөттүн баалоо ишке ашырылды.',
        'Долбоорлордун мөөнөттөрү жана чыгашалары кыскартылды, долбоор иштеринин сапаты жогорулады.',
        'Системаны болжол менен 800 кызматкер пайдаланган; жалпы көлөмү 6 ТБ болгон болжол менен 450 000 файл иштетилген, айына 90 000 чейин транзакция, эң жогорку натыйжалуулук секундасына 25 транзакция.',
        '1C платформасында структураланган жеткирүү процесси менен нөлдөн иштеп чыгуу жана колдоо бөлүмү (6 кызматкер) түзүлдү: баштоо, иштеп чыгуу, сыноо эксплуатациясы жана продукцияга чыгаруу.'
      ]
    },
    {
      id: 'financial-management-project-planning',
      sectors: ['construction', 'oil-gas'],
      title: 'Инженердик долбоорлордо бюджеттештирүү, келишимдер жана эсептешүүлөрдү башкаруу',
      company: 'Giprovostokneft',
      role: 'Жетектөөчү программалык камсыздоо инженери',
      sectorLabel: 'Мунай-газ жана курулуш',
      contextLine: 'Giprovostokneft · Мунай-газ жана курулуш',
      summary:
        'Долбоорлоо институтунда казыначылык, бюджеттештирүү (БДР, БДДС, инвестициялык бюджет), финансылык контролдоо жана долбоорду пландоо системаларын иштеп чыгып, ишке киргиздим. Автоматтык тапшырма түзүү менен контроллинг, карызды болжолдоо жана what-if анализи менен аналитикалык отчеттуулук, ошондой эле корпоративдик портал жана Oracle Primavera менен интеграцияларды камтыйт.',
      preparedArtifacts: [
        'Казыначылык, БДДС, БДР жана инвестициялык бюджет модулдары.',
        'Өндүрүш, сатуу, эмгек акы, инвестициялар жана кредиттик линиялар боюнча функционалдык бюджеттер.',
        'Көп валюталуу эсептешүүлөр, келишимдерди эсепке алуу, кошумча келишимдерди көзөмөлдөө жана мөөнөттөрдү контролдоо.',
        'Аналитикалык отчеттуулук, карызды болжолдоо, what-if анализи жана фактордук анализ.',
        'Долбоорлор боюнча көлөмдүк-календардык пландоо, субподряддык иштерди эсепке алуу жана календардык пландоо.',
        '1C ZUP, корпоративдик портал жана Oracle Primavera менен интеграциялар.'
      ],
      technologies: ['.NET C#', '1C Accounting', 'Intalev Corporate Finance', 'MS SQL', 'MS SharePoint', 'Oracle Primavera', 'SOAP'],
      outcome: [
        'Болжол менен 1000 колдонуучу үчүн финансылык башкаруу жана долбоорду пландоо системасы ишке киргизилди.',
        'Кыска мөөнөттүү кредиттик карыз жана ишкананын чыгашалары кыскартылды. Эсептешүүлөрдүн ачыктыгы жогорулады, финансылык абалды жана тобокелдиктерди болжолдоо жана контролдоо жакшырды.'
      ]
    },
    {
      id: 'engineering-data-document-management',
      sectors: ['construction'],
      title: 'Инженердик маалыматтарды башкаруу жана инженердик документ жүгүртүү',
      company: 'Enter Engineering Russia',
      role: 'Системдик аналитик',
      contextLine: 'Enter Engineering Russia · Системдик анализ · Курулуш',
      summary:
        'Intergraph Hexagon негизинде өнөр жай курулушунда инженердик маалыматтарды башкаруу жана инженердик документ жүгүртүү үчүн талаптарды жана техникалык долбоордун артефакттарын даярдадым.',
      preparedArtifacts: [
        '1D, 2D жана 3D маалыматтарды камтыган инженердик маалыматтарды башкаруу техникалык долбоору.',
        'Техникалык документ жүгүртүүгө коюлуучу талаптар.',
        'Инженердик документтерди чыгаруу жана тиешелүү инженердик маалымат агымдары үчүн системанын чек аралары.',
        'SDx инженердик документ жүгүртүү системасы катары системалык ландшафттын сүрөттөмөсү.'
      ],
      technologies: ['Intergraph Hexagon SDx', 'Intergraph Hexagon SRD', 'CAD systems', 'REST'],
      outcome: [
        '1D, 2D жана 3D маалыматтарды камтыган инженердик документ жүгүртүү жана инженердик маалыматтарды башкаруу системасы ишке киргизилди.'
      ]
    },
    {
      id: 'procurement-supply-chain',
      sectors: ['construction'],
      title: 'Сатып алууларды жана жеткирүү чынжырын башкаруу',
      company: 'Enter Engineering Russia',
      role: 'Системдик аналитик',
      contextLine: 'Enter Engineering Russia · Системдик анализ · Курулуш',
      summary:
        'Smart Materials, Smart Reference Data жана 1C ERP USO негизинде өнөр жай курулушу үчүн сатып алуулар, логистика, жеткирүү чынжыры жана курулушту эксплуатацияга тапшыруу процесстери боюнча талаптарды жана техникалык долбоордун артефакттарын даярдадым.',
      preparedArtifacts: [
        'Сатып алууларды жана логистиканы башкаруу талаптары.',
        'Курулуш иштерин аткаруу жана эксплуатацияга тапшыруу талаптары.',
        'Ченемдик-маалыматтык маалыматты башкаруу талаптары.',
        'Smart Materials, Smart Reference Data жана 1C ERP USO ну камтыган системалык ландшафттын сүрөттөмөсү.'
      ],
      technologies: ['Intergraph Hexagon', 'Smart Materials', 'Smart Reference Data', 'REST', 'SOAP', '1C ERP USO', 'Oracle DB'],
      outcome: [
        'Сатып алууларды, логистиканы, ченемдик-маалыматтык маалыматты башкаруу жана курулуш объекттерин эксплуатацияга тапшыруу системасы ишке киргизилди.'
      ]
    },
    {
      id: 'bpmn-er-modeler',
      sectors: ['other'],
      title: 'BPMN/ER Modeler',
      company: 'Жеке долбоор',
      role: 'Автордук курал',
      contextLine: 'Жеке долбоор · Башка долбоорлор',
      summary:
        'Жергиликтүү BPMN/ER Modeler иштеп чыктым: BPMN.io (bpmn-js) негизиндеги BPMN редактору жана DBML/dbdiagram.io синтаксисине негизделген жеке DSL боюнча ER редактору.',
      preparedArtifacts: [],
      technologies: [
        'BPMN.io (bpmn-js)',
        'DBML',
        'HTML',
        'CSS',
        'JavaScript',
        'SVG',
        'File System Access API',
        'Canvas API'
      ],
      outcome: [
        'BPMN процесстерин моделдөө жана ER диаграммалары үчүн жергиликтүү курал ишке киргизилди.',
        'Сервердик инфраструктурасыз бир жумуш мейкиндигинде процесстик жана маалымат моделдерин бириктирүү ишке ашырылды.'
      ]
    }
  ]
};
