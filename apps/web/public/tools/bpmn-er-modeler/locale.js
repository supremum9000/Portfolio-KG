(function () {
  var SUPPORTED_LOCALES = ['ru', 'en', 'kg'];
  var LOCALE_STORAGE_KEY = 'bpmn-modeler-locale';
  var currentLocale = 'ru';
  var localeObserver = null;
  var localeApplyScheduled = false;
  var isApplyingLocale = false;

  var TRANSLATIONS = {
    en: {
      'Проекты': 'Projects',
      'Новая диаграмма (Ctrl+N)': 'New diagram (Ctrl+N)',
      'Открыть (Ctrl+O)': 'Open (Ctrl+O)',
      'Сохранить (Ctrl+S)': 'Save (Ctrl+S)',
      'Сохранить как (Ctrl+Shift+S)': 'Save as (Ctrl+Shift+S)',
      'Экспорт': 'Export',
      'Экспорт ER': 'Export ER',
      'Открыть ER': 'Open ER',
      'Сохранить ER': 'Save ER',
      'Сбросить позиции': 'Reset positions',
      'Вписать в экран': 'Fit to screen',
      'Отменить (Ctrl+Z)': 'Undo (Ctrl+Z)',
      'Повторить (Ctrl+Y)': 'Redo (Ctrl+Y)',
      'Вырезать (Ctrl+X)': 'Cut (Ctrl+X)',
      'Копировать (Ctrl+C)': 'Copy (Ctrl+C)',
      'Вставить (Ctrl+V)': 'Paste (Ctrl+V)',
      'XML (Ctrl+E)': 'XML (Ctrl+E)',
      'Свойства (Ctrl+P)': 'Properties (Ctrl+P)',
      'Закрыть': 'Close',
      'Новая': 'New',
      'Открыть': 'Open',
      'Сохранить': 'Save',
      'Сохранить как…': 'Save as…',
      'Экспорт ▾': 'Export ▾',
      'Скачать SVG': 'Export SVG',
      'Скачать PNG': 'Export PNG',
      'Скачать PNG @2x': 'Export PNG @2x',
      'Скачать PDF': 'Export PDF',
      'Вырезать': 'Cut',
      'Копировать': 'Copy',
      'Вставить': 'Paste',
      'Свойства': 'Properties',
      'Скрыть': 'Hide',
      'Автолейаут': 'Auto layout',
      'Вписать': 'Fit',
      'DSL Редактор': 'DSL Editor',
      '? Синтаксис': '? Syntax',
      'Синтаксис ER DSL': 'ER DSL syntax',
      'Типы связей:': 'Relationship types:',
      'Атрибуты:': 'Attributes:',
      'Готов': 'Ready',
      'Светлая': 'Light',
      'Тёмная': 'Dark',
      'Светлая тема': 'Light theme',
      'Тёмная тема': 'Dark theme',
      'Готов к работе': 'Ready to work',
      'Перетащите .bpmn файл': 'Drop a .bpmn file here',
      'Откроется в новой вкладке': 'It will open in a new tab',
      'Горячие клавиши': 'Keyboard shortcuts',
      'Новая вкладка': 'New tab',
      'Открыть файл': 'Open file',
      'Сохранить проект / Сохранить как…': 'Save project / Save as…',
      'Закрыть вкладку': 'Close tab',
      'Отменить / Повторить': 'Undo / Redo',
      'Вырезать элементы': 'Cut elements',
      'Копировать элементы': 'Copy elements',
      'Вставить элементы': 'Paste elements',
      'XML редактор': 'XML editor',
      'Панель свойств': 'Properties panel',
      'Переключить тему': 'Toggle theme',
      'Перемещение холста': 'Pan canvas',
      'Общие': 'General',
      'Тип': 'Type',
      'Имя': 'Name',
      'Документация': 'Documentation',
      'Описание': 'Description',
      'Процесс': 'Process',
      'Исполняемый': 'Executable',
      'Да': 'Yes',
      'Нет': 'No',
      'Задача': 'Task',
      'Преобразовать в': 'Convert to',
      'Пользовательская': 'User',
      'Сервисная': 'Service',
      'Скриптовая': 'Script',
      'Отправка': 'Send',
      'Получение': 'Receive',
      'Ручная': 'Manual',
      'Бизнес-правило': 'Business rule',
      'Компенсация': 'Compensation',
      'Многоэкземплярность': 'Multi-instance',
      'Тип цикла': 'Loop type',
      'Параллельный (|||)': 'Parallel (|||)',
      'Последовательный (≡)': 'Sequential (≡)',
      'Стандартный цикл (↻)': 'Standard loop (↻)',
      'Кардинальность': 'Cardinality',
      'Условие завершения': 'Completion condition',
      'Условие цикла': 'Loop condition',
      'Максимум итераций': 'Max iterations',
      'Скрипт': 'Script',
      'Язык (scriptFormat)': 'Language (scriptFormat)',
      'Тело скрипта': 'Script body',
      'Результат (resultVariable)': 'Result (resultVariable)',
      'Шлюз': 'Gateway',
      'Исключающий (XOR)': 'Exclusive (XOR)',
      'Параллельный (AND)': 'Parallel (AND)',
      'Включающий (OR)': 'Inclusive (OR)',
      'Сложный': 'Complex',
      'На основе событий': 'Event-based',
      'Поток по умолчанию': 'Default flow',
      '— нет —': '— none —',
      'Событие': 'Event',
      'Определение события': 'Event definition',
      'Без определения': 'None',
      'Сообщение': 'Message',
      'Таймер': 'Timer',
      'Условие': 'Condition',
      'Сигнал': 'Signal',
      'Ошибка': 'Error',
      'Эскалация': 'Escalation',
      'Ссылка': 'Link',
      'Терминация': 'Terminate',
      'Тип таймера': 'Timer type',
      'Не задан': 'Not set',
      'Длительность (Duration)': 'Duration',
      'Дата (Date)': 'Date',
      'Цикл (Cycle)': 'Cycle',
      'Значение': 'Value',
      'Имя сообщения': 'Message name',
      'Имя сигнала': 'Signal name',
      'Код ошибки': 'Error code',
      'Имя ошибки': 'Error name',
      'Код эскалации': 'Escalation code',
      'Имя ссылки': 'Link name',
      'Условие (FormalExpression)': 'Condition (FormalExpression)',
      'Поток': 'Sequence flow',
      'Размеры и позиция': 'Size and position',
      'Ширина': 'Width',
      'Высота': 'Height',
      'Цвет': 'Color',
      'Обводка': 'Stroke',
      'Сбросить': 'Reset',
      'Заливка': 'Fill',
      'Красный': 'Red',
      'Оранжевый': 'Orange',
      'Жёлтый': 'Yellow',
      'Зелёный': 'Green',
      'Синий': 'Blue',
      'Фиолетовый': 'Purple',
      'Серый': 'Gray',
      'Стандарт': 'Default',
      'Быстрый выбор': 'Quick presets',
      'Начальные события': 'Start events',
      'Начальное событие': 'Start event',
      'Начальное событие (Сообщение)': 'Start event (Message)',
      'Начальное событие (Таймер)': 'Start event (Timer)',
      'Начальное событие (Условие)': 'Start event (Condition)',
      'Начальное событие (Сигнал)': 'Start event (Signal)',
      'Промежуточные события': 'Intermediate events',
      'Промежуточное событие': 'Intermediate event',
      'Отправка сообщения': 'Throw message',
      'Эскалация (throw)': 'Escalation (throw)',
      'Ссылка (throw)': 'Link (throw)',
      'Компенсация (throw)': 'Compensation (throw)',
      'Сигнал (throw)': 'Signal (throw)',
      'Получение сообщения': 'Catch message',
      'Таймер (catch)': 'Timer (catch)',
      'Условие (catch)': 'Condition (catch)',
      'Ссылка (catch)': 'Link (catch)',
      'Сигнал (catch)': 'Signal (catch)',
      'Конечные события': 'End events',
      'Конечное событие': 'End event',
      'Конечное (Сообщение)': 'End (Message)',
      'Конечное (Эскалация)': 'End (Escalation)',
      'Конечное (Ошибка)': 'End (Error)',
      'Конечное (Компенсация)': 'End (Compensation)',
      'Конечное (Сигнал)': 'End (Signal)',
      'Конечное (Терминация)': 'End (Terminate)',
      'Шлюзы': 'Gateways',
      'Исключающий шлюз (XOR)': 'Exclusive gateway (XOR)',
      'Параллельный шлюз (AND)': 'Parallel gateway (AND)',
      'Включающий шлюз (OR)': 'Inclusive gateway (OR)',
      'Сложный шлюз': 'Complex gateway',
      'Шлюз на основе событий': 'Event-based gateway',
      'Задачи': 'Tasks',
      'Пользовательская задача': 'User task',
      'Сервисная задача': 'Service task',
      'Скриптовая задача': 'Script task',
      'Задача отправки': 'Send task',
      'Задача получения': 'Receive task',
      'Ручная задача': 'Manual task',
      'Вызов процесса': 'Call activity',
      'Подпроцессы': 'Subprocesses',
      'Подпроцесс (развёрнутый)': 'Expanded subprocess',
      'Подпроцесс (свёрнутый)': 'Collapsed subprocess',
      'Транзакция': 'Transaction',
      'Данные': 'Data',
      'Объект данных': 'Data object',
      'Хранилище данных': 'Data store',
      'Участники': 'Participants',
      'Пул (Участник)': 'Pool (Participant)',
      'Пустой пул (Empty pool)': 'Empty pool',
      'Аннотации': 'Annotations',
      'Текстовая аннотация': 'Text annotation',
      'Группа': 'Group',
      'Ничего не найдено': 'No matches found',
      'Только .bpmn, .xml и .erdsl': 'Only .bpmn, .xml and .erdsl files are supported',
      'Файл скачан': 'File downloaded',
      'SVG экспортирован': 'SVG exported',
      'PNG экспортирован': 'PNG exported',
      'Ошибка рендера PNG': 'PNG render error',
      'Ошибка экспорта PNG': 'PNG export error',
      'Позиции сброшены': 'Positions reset',
      'Нет диаграммы': 'No diagram',
      'Popup заблокирован': 'Popup blocked',
      'PDF: используйте печать': 'PDF: use print',
      'Выберите элементы для копирования': 'Select elements to copy',
      'Выберите элементы для вырезания': 'Select elements to cut',
      'Буфер обмена пуст': 'Clipboard is empty',
      'XML применён': 'XML applied',
      'ID уже используется': 'ID is already in use',
      'Требуется Chrome или Edge': 'Chrome or Edge is required',
      'Нет прав на запись в эту папку': 'No write permission for this folder',
      'Нет прав на запись': 'No write permission',
      'Проект уже открыт': 'Project is already open',
      'Проект обновлён': 'Project refreshed',
      'Ошибка обновления проекта': 'Failed to refresh project',
      'Имя файла:': 'File name:',
      'Отображаемое имя:': 'Display name:',
      'Процессы': 'Processes',
      'Модели данных': 'Data models',
      'Нет открытых проектов.': 'No open projects.',
      'Последние:': 'Recent:',
      'Откройте папку заново': 'Open a folder again',
      'Новый проект': 'New project',
      'Открыть папку': 'Open folder',
      'Создать файл': 'Create file',
      'Сохранить проект': 'Save project',
      'Обновить': 'Refresh',
      'Закрыть проект': 'Close project',
      'Применить': 'Apply',
      'Все элементы (N)': 'All elements (N)',
      'Тема (Ctrl+Shift+T)': 'Theme (Ctrl+Shift+T)',
      'Начало': 'Start',
      'Задача 1': 'Task 1',
      'Условие?': 'Condition?',
      'Вариант A': 'Option A',
      'Вариант B': 'Option B',
      'Конец': 'End',
      '📁 Проекты': '📁 Projects',
      '📐 DSL Редактор': '📐 DSL Editor',
      'ER-диаграмма': 'ER Diagram',
      'BPMN-процесс': 'BPMN Process',
      'Привязан к файлу': 'Linked file',
      'Выберите элемент': 'Select an element',
      'на диаграмме': 'on the diagram',
      'Нет данных': 'No data',
      'Ошибка создания вкладки': 'Failed to create tab',
      'Ошибка при закрытии вкладки': 'Failed to close tab',
      'Ошибка сохранения': 'Save error',
      'Ошибка открытия': 'Open error',
      'Ошибка открытия проекта': 'Failed to open project',
      'Ошибка создания проекта': 'Failed to create project',
      'Ошибка создания файла': 'Failed to create file',
      'ER-диаграмма сохранена': 'ER diagram saved',
      'ER-диаграмма скачана': 'ER diagram downloaded',
      'Ошибка копирования': 'Copy error',
      'Ошибка вырезания': 'Cut error',
      'Ошибка вставки': 'Paste error',
      'Ошибка при открытии файла': 'File open error',
      'Ошибка инициализации': 'Initialization error',
      'Нет несохранённых файлов': 'No unsaved files',
      'Русский': 'Russian'
    },
    kg: {
      'Проекты': 'Долбоорлор',
      'Новая диаграмма (Ctrl+N)': 'Жаңы диаграмма (Ctrl+N)',
      'Открыть (Ctrl+O)': 'Ачуу (Ctrl+O)',
      'Сохранить (Ctrl+S)': 'Сактоо (Ctrl+S)',
      'Сохранить как (Ctrl+Shift+S)': 'Башка ат менен сактоо (Ctrl+Shift+S)',
      'Экспорт': 'Экспорт',
      'Экспорт ER': 'ER экспорт',
      'Открыть ER': 'ER ачуу',
      'Сохранить ER': 'ER сактоо',
      'Сбросить позиции': 'Жайгашууларды баштапкыга кайтаруу',
      'Вписать в экран': 'Экранга ылайыктоо',
      'Отменить (Ctrl+Z)': 'Жокко чыгаруу (Ctrl+Z)',
      'Повторить (Ctrl+Y)': 'Кайталоо (Ctrl+Y)',
      'Вырезать (Ctrl+X)': 'Кесүү (Ctrl+X)',
      'Копировать (Ctrl+C)': 'Көчүрүү (Ctrl+C)',
      'Вставить (Ctrl+V)': 'Коюу (Ctrl+V)',
      'XML (Ctrl+E)': 'XML (Ctrl+E)',
      'Свойства (Ctrl+P)': 'Касиеттер (Ctrl+P)',
      'Закрыть': 'Жабуу',
      'Новая': 'Жаңы',
      'Открыть': 'Ачуу',
      'Сохранить': 'Сактоо',
      'Сохранить как…': 'Башка ат менен сактоо…',
      'Экспорт ▾': 'Экспорт ▾',
      'Скачать SVG': 'SVG экспорт',
      'Скачать PNG': 'PNG экспорт',
      'Скачать PNG @2x': 'PNG экспорт @2x',
      'Скачать PDF': 'PDF экспорт',
      'Вырезать': 'Кесүү',
      'Копировать': 'Көчүрүү',
      'Вставить': 'Коюу',
      'Свойства': 'Касиеттер',
      'Скрыть': 'Жашыруу',
      'Автолейаут': 'Авто жайгаштыруу',
      'Вписать': 'Ылайыктоо',
      'DSL Редактор': 'DSL Редактор',
      '? Синтаксис': '? Синтаксис',
      'Синтаксис ER DSL': 'ER DSL синтаксиси',
      'Типы связей:': 'Байланыш түрлөрү:',
      'Атрибуты:': 'Атрибуттар:',
      'Готов': 'Даяр',
      'Светлая': 'Жарык',
      'Тёмная': 'Караңгы',
      'Светлая тема': 'Жарык тема',
      'Тёмная тема': 'Караңгы тема',
      'Готов к работе': 'Иштөөгө даяр',
      'Перетащите .bpmn файл': '.bpmn файлды бул жерге сүйрөңүз',
      'Откроется в новой вкладке': 'Жаңы өтмөктө ачылат',
      'Горячие клавиши': 'Тез баскычтар',
      'Новая вкладка': 'Жаңы өтмөк',
      'Открыть файл': 'Файлды ачуу',
      'Сохранить проект / Сохранить как…': 'Долбоорду сактоо / Башка ат менен сактоо…',
      'Закрыть вкладку': 'Өтмөктү жабуу',
      'Отменить / Повторить': 'Жокко чыгаруу / Кайталоо',
      'Вырезать элементы': 'Элементтерди кесүү',
      'Копировать элементы': 'Элементтерди көчүрүү',
      'Вставить элементы': 'Элементтерди коюу',
      'XML редактор': 'XML редактор',
      'Панель свойств': 'Касиеттер панели',
      'Переключить тему': 'Теманы алмаштыруу',
      'Перемещение холста': 'Холстту жылдыруу',
      'Общие': 'Жалпы',
      'Тип': 'Тип',
      'Имя': 'Аты',
      'Документация': 'Документация',
      'Описание': 'Сүрөттөмө',
      'Процесс': 'Процесс',
      'Исполняемый': 'Аткарылуучу',
      'Да': 'Ооба',
      'Нет': 'Жок',
      'Задача': 'Тапшырма',
      'Преобразовать в': 'Өзгөртүү',
      'Пользовательская': 'Колдонуучу',
      'Сервисная': 'Сервис',
      'Скриптовая': 'Скрипт',
      'Отправка': 'Жөнөтүү',
      'Получение': 'Кабыл алуу',
      'Ручная': 'Кол менен',
      'Бизнес-правило': 'Бизнес эреже',
      'Компенсация': 'Компенсация',
      'Многоэкземплярность': 'Көп нускалуулук',
      'Тип цикла': 'Цикл түрү',
      'Параллельный (|||)': 'Параллель (|||)',
      'Последовательный (≡)': 'Ырааттуу (≡)',
      'Стандартный цикл (↻)': 'Стандарт цикл (↻)',
      'Кардинальность': 'Кардиналдуулук',
      'Условие завершения': 'Аяктоо шарты',
      'Условие цикла': 'Цикл шарты',
      'Максимум итераций': 'Максимум итерациялар',
      'Скрипт': 'Скрипт',
      'Язык (scriptFormat)': 'Тил (scriptFormat)',
      'Тело скрипта': 'Скрипт тулкусу',
      'Результат (resultVariable)': 'Натыйжа (resultVariable)',
      'Шлюз': 'Шлюз',
      'Исключающий (XOR)': 'Алып салуучу (XOR)',
      'Параллельный (AND)': 'Параллель (AND)',
      'Включающий (OR)': 'Камтыган (OR)',
      'Сложный': 'Татаал',
      'На основе событий': 'Окуяга негизделген',
      'Поток по умолчанию': 'Демейки агым',
      '— нет —': '— жок —',
      'Событие': 'Окуя',
      'Определение события': 'Окуя аныктамасы',
      'Без определения': 'Аныктамасыз',
      'Сообщение': 'Билдирүү',
      'Таймер': 'Таймер',
      'Условие': 'Шарт',
      'Сигнал': 'Сигнал',
      'Ошибка': 'Ката',
      'Эскалация': 'Эскалация',
      'Ссылка': 'Шилтеме',
      'Терминация': 'Терминация',
      'Тип таймера': 'Таймер түрү',
      'Не задан': 'Белгиленген эмес',
      'Длительность (Duration)': 'Узактыгы (Duration)',
      'Дата (Date)': 'Күн (Date)',
      'Цикл (Cycle)': 'Цикл (Cycle)',
      'Значение': 'Маани',
      'Имя сообщения': 'Билдирүү аты',
      'Имя сигнала': 'Сигнал аты',
      'Код ошибки': 'Ката коду',
      'Имя ошибки': 'Ката аты',
      'Код эскалации': 'Эскалация коду',
      'Имя ссылки': 'Шилтеме аты',
      'Условие (FormalExpression)': 'Шарт (FormalExpression)',
      'Поток': 'Агым',
      'Размеры и позиция': 'Өлчөмү жана жайгашуусу',
      'Ширина': 'Туурасы',
      'Высота': 'Бийиктиги',
      'Цвет': 'Түс',
      'Обводка': 'Чек',
      'Сбросить': 'Баштапкыга кайтаруу',
      'Заливка': 'Толтуруу',
      'Красный': 'Кызыл',
      'Оранжевый': 'Кызгылт сары',
      'Жёлтый': 'Сары',
      'Зелёный': 'Жашыл',
      'Синий': 'Көк',
      'Фиолетовый': 'Кызгылт көк',
      'Серый': 'Боз',
      'Стандарт': 'Стандарт',
      'Быстрый выбор': 'Тез тандоо',
      'Начальные события': 'Баштапкы окуялар',
      'Начальное событие': 'Баштапкы окуя',
      'Начальное событие (Сообщение)': 'Баштапкы окуя (Билдирүү)',
      'Начальное событие (Таймер)': 'Баштапкы окуя (Таймер)',
      'Начальное событие (Условие)': 'Баштапкы окуя (Шарт)',
      'Начальное событие (Сигнал)': 'Баштапкы окуя (Сигнал)',
      'Промежуточные события': 'Ортоңку окуялар',
      'Промежуточное событие': 'Ортоңку окуя',
      'Отправка сообщения': 'Билдирүү жөнөтүү',
      'Эскалация (throw)': 'Эскалация (throw)',
      'Ссылка (throw)': 'Шилтеме (throw)',
      'Компенсация (throw)': 'Компенсация (throw)',
      'Сигнал (throw)': 'Сигнал (throw)',
      'Получение сообщения': 'Билдирүү кабыл алуу',
      'Таймер (catch)': 'Таймер (catch)',
      'Условие (catch)': 'Шарт (catch)',
      'Ссылка (catch)': 'Шилтеме (catch)',
      'Сигнал (catch)': 'Сигнал (catch)',
      'Конечные события': 'Акыркы окуялар',
      'Конечное событие': 'Акыркы окуя',
      'Конечное (Сообщение)': 'Акыркы (Билдирүү)',
      'Конечное (Эскалация)': 'Акыркы (Эскалация)',
      'Конечное (Ошибка)': 'Акыркы (Ката)',
      'Конечное (Компенсация)': 'Акыркы (Компенсация)',
      'Конечное (Сигнал)': 'Акыркы (Сигнал)',
      'Конечное (Терминация)': 'Акыркы (Терминация)',
      'Шлюзы': 'Шлюздар',
      'Исключающий шлюз (XOR)': 'Алып салуучу шлюз (XOR)',
      'Параллельный шлюз (AND)': 'Параллель шлюз (AND)',
      'Включающий шлюз (OR)': 'Камтыган шлюз (OR)',
      'Сложный шлюз': 'Татаал шлюз',
      'Шлюз на основе событий': 'Окуяга негизделген шлюз',
      'Задачи': 'Тапшырмалар',
      'Пользовательская задача': 'Колдонуучу тапшырмасы',
      'Сервисная задача': 'Сервис тапшырмасы',
      'Скриптовая задача': 'Скрипт тапшырмасы',
      'Задача отправки': 'Жөнөтүү тапшырмасы',
      'Задача получения': 'Кабыл алуу тапшырмасы',
      'Ручная задача': 'Кол менен тапшырма',
      'Вызов процесса': 'Процессти чакыруу',
      'Подпроцессы': 'Подпроцесстер',
      'Подпроцесс (развёрнутый)': 'Жайылган подпроцесс',
      'Подпроцесс (свёрнутый)': 'Жыйылган подпроцесс',
      'Транзакция': 'Транзакция',
      'Данные': 'Маалыматтар',
      'Объект данных': 'Маалымат объектиси',
      'Хранилище данных': 'Маалымат сактагычы',
      'Участники': 'Катышуучулар',
      'Пул (Участник)': 'Пул (Катышуучу)',
      'Пустой пул (Empty pool)': 'Бош пул',
      'Аннотации': 'Аннотациялар',
      'Текстовая аннотация': 'Тексттик аннотация',
      'Группа': 'Топ',
      'Ничего не найдено': 'Эч нерсе табылган жок',
      'Только .bpmn, .xml и .erdsl': '.bpmn, .xml жана .erdsl файлдар гана колдоого алынат',
      'Файл скачан': 'Файл жүктөлдү',
      'SVG экспортирован': 'SVG экспорттолду',
      'PNG экспортирован': 'PNG экспорттолду',
      'Ошибка рендера PNG': 'PNG рендер катасы',
      'Ошибка экспорта PNG': 'PNG экспорт катасы',
      'Позиции сброшены': 'Жайгашуулар баштапкыга кайтарылды',
      'Нет диаграммы': 'Диаграмма жок',
      'Popup заблокирован': 'Popup бөгөттөлдү',
      'PDF: используйте печать': 'PDF: басып чыгарууну колдонуңуз',
      'Выберите элементы для копирования': 'Көчүрүү үчүн элементтерди тандаңыз',
      'Выберите элементы для вырезания': 'Кесүү үчүн элементтерди тандаңыз',
      'Буфер обмена пуст': 'Алмашуу буфери бош',
      'XML применён': 'XML колдонулду',
      'ID уже используется': 'ID мурунтан эле колдонулуп жатат',
      'Требуется Chrome или Edge': 'Chrome же Edge талап кылынат',
      'Нет прав на запись в эту папку': 'Бул папкага жазуу укугу жок',
      'Нет прав на запись': 'Жазуу укугу жок',
      'Проект уже открыт': 'Долбоор мурунтан эле ачык',
      'Проект обновлён': 'Долбоор жаңыланды',
      'Ошибка обновления проекта': 'Долбоорду жаңылоодо ката',
      'Имя файла:': 'Файл аты:',
      'Отображаемое имя:': 'Көрсөтүлүүчү аты:',
      'Процессы': 'Процесстер',
      'Модели данных': 'Маалымат моделдери',
      'Нет открытых проектов.': 'Ачык долбоорлор жок.',
      'Последние:': 'Акыркылар:',
      'Откройте папку заново': 'Папканы кайра ачыңыз',
      'Новый проект': 'Жаңы долбоор',
      'Открыть папку': 'Папканы ачуу',
      'Создать файл': 'Файл түзүү',
      'Сохранить проект': 'Долбоорду сактоо',
      'Обновить': 'Жаңылоо',
      'Закрыть проект': 'Долбоорду жабуу',
      'Применить': 'Колдонуу',
      'Все элементы (N)': 'Бардык элементтер (N)',
      'Тема (Ctrl+Shift+T)': 'Тема (Ctrl+Shift+T)',
      'Начало': 'Башталыш',
      'Задача 1': 'Тапшырма 1',
      'Условие?': 'Шарт?',
      'Вариант A': 'Вариант A',
      'Вариант B': 'Вариант B',
      'Конец': 'Аяктоо',
      '📁 Проекты': '📁 Долбоорлор',
      '📐 DSL Редактор': '📐 DSL Редактор',
      'ER-диаграмма': 'ER диаграмма',
      'BPMN-процесс': 'BPMN Процесс',
      'Привязан к файлу': 'Файлга байланган',
      'Выберите элемент': 'Элементти тандаңыз',
      'на диаграмме': 'диаграммада',
      'Нет данных': 'Маалымат жок',
      'Ошибка создания вкладки': 'Өтмөк түзүүдө ката',
      'Ошибка при закрытии вкладки': 'Өтмөктү жабууда ката',
      'Ошибка сохранения': 'Сактоо катасы',
      'Ошибка открытия': 'Ачуу катасы',
      'Ошибка открытия проекта': 'Долбоорду ачууда ката',
      'Ошибка создания проекта': 'Долбоор түзүүдө ката',
      'Ошибка создания файла': 'Файл түзүүдө ката',
      'ER-диаграмма сохранена': 'ER диаграмма сакталды',
      'ER-диаграмма скачана': 'ER диаграмма жүктөлдү',
      'Ошибка копирования': 'Көчүрүү катасы',
      'Ошибка вырезания': 'Кесүү катасы',
      'Ошибка вставки': 'Коюу катасы',
      'Ошибка при открытии файла': 'Файлды ачууда ката',
      'Ошибка инициализации': 'Инициализация катасы',
      'Нет несохранённых файлов': 'Сакталбаган файлдар жок',
      'Русский': 'Орусча'
    }
  };

  var PATTERNS = {
    en: [
      {
        regex: /^«(.+)» открыт$/,
        replace: function (_, name) { return 'Opened "' + name + '"'; }
      },
      {
        regex: /^Сохранено в «(.+)»$/,
        replace: function (_, name) { return 'Saved to "' + name + '"'; }
      },
      {
        regex: /^Сохранено как «(.+)»$/,
        replace: function (_, name) { return 'Saved as "' + name + '"'; }
      },
      {
        regex: /^Проект «(.+)» создан$/,
        replace: function (_, name) { return 'Project "' + name + '" created'; }
      },
      {
        regex: /^Проект «(.+)» открыт$/,
        replace: function (_, name) { return 'Project "' + name + '" opened'; }
      },
      {
        regex: /^Папка «(.+)» уже содержит проект\. Открыть его\?$/,
        replace: function (_, name) { return 'Folder "' + name + '" already contains a project. Open it?'; }
      },
      {
        regex: /^В папке «(.+)» нет project\.json\. Создать проект\?$/,
        replace: function (_, name) { return 'Folder "' + name + '" has no project.json. Create a project?'; }
      },
      {
        regex: /^Проект «(.+)» содержит несохранённые изменения\. Закрыть\?$/,
        replace: function (_, name) { return 'Project "' + name + '" has unsaved changes. Close it?'; }
      },
      {
        regex: /^Файл «(.+)» уже существует\. Перезаписать\?$/,
        replace: function (_, name) { return 'File "' + name + '" already exists. Overwrite it?'; }
      },
      {
        regex: /^«(.+)» создан$/,
        replace: function (_, name) { return 'Created "' + name + '"'; }
      },
      {
        regex: /^Файл загружен: (.+)$/,
        replace: function (_, name) { return 'Loaded file: ' + name; }
      },
      {
        regex: /^Строка (\d+): не распознано «(.+)»$/,
        replace: function (_, line, token) { return 'Line ' + line + ': could not parse "' + token + '"'; }
      },
      {
        regex: /^Поле «(.+)» не найдено в таблице «(.+)»$/,
        replace: function (_, field, table) { return 'Field "' + field + '" was not found in table "' + table + '"'; }
      },
      {
        regex: /^(\d+) таблиц, (\d+) связей$/,
        replace: function (_, tables, refs) { return tables + ' tables, ' + refs + ' relationships'; }
      },
      {
        regex: /^(\d+) ошибок:\n([\s\S]+)$/,
        replace: function (_, count, rest) { return count + ' errors:\n' + rest; }
      },
      {
        regex: /^Скопировано: (\d+) эл\.$/,
        replace: function (_, count) { return 'Copied: ' + count + ' items'; }
      },
      {
        regex: /^Вырезано: (\d+) эл\.$/,
        replace: function (_, count) { return 'Cut: ' + count + ' items'; }
      },
      {
        regex: /^Вставлено: (\d+) эл\.$/,
        replace: function (_, count) { return 'Pasted: ' + count + ' items'; }
      },
      {
        regex: /^Ошибка: (.+)$/,
        replace: function (_, msg) { return 'Error: ' + msg; }
      },
      {
        regex: /^Ничего не найдено$/,
        replace: function () { return 'No matches found'; }
      },
      {
        regex: /^Файл не найден или недоступен\. Нажмите ↻ для обновления дерева\.$/,
        replace: function () { return 'File not found or unavailable. Click ↻ to refresh the tree.'; }
      },
      {
        regex: /^Сохранено (\d+) файл$/,
        replace: function (_, count) { return 'Saved ' + count + ' file'; }
      },
      {
        regex: /^Сохранено (\d+) файла$/,
        replace: function (_, count) { return 'Saved ' + count + ' files'; }
      },
      {
        regex: /^Сохранено (\d+) файлов$/,
        replace: function (_, count) { return 'Saved ' + count + ' files'; }
      },
      {
        regex: /^Сохранено (\d+) из (\d+) файл$/,
        replace: function (_, saved, total) { return 'Saved ' + saved + ' of ' + total + ' file'; }
      },
      {
        regex: /^Сохранено (\d+) из (\d+) файла$/,
        replace: function (_, saved, total) { return 'Saved ' + saved + ' of ' + total + ' files'; }
      },
      {
        regex: /^Сохранено (\d+) из (\d+) файлов$/,
        replace: function (_, saved, total) { return 'Saved ' + saved + ' of ' + total + ' files'; }
      }
    ],
    kg: [
      {
        regex: /^«(.+)» открыт$/,
        replace: function (_, name) { return '"' + name + '" ачылды'; }
      },
      {
        regex: /^Сохранено в «(.+)»$/,
        replace: function (_, name) { return '"' + name + '" ичине сакталды'; }
      },
      {
        regex: /^Сохранено как «(.+)»$/,
        replace: function (_, name) { return '"' + name + '" катары сакталды'; }
      },
      {
        regex: /^Проект «(.+)» создан$/,
        replace: function (_, name) { return '"' + name + '" долбоору түзүлдү'; }
      },
      {
        regex: /^Проект «(.+)» открыт$/,
        replace: function (_, name) { return '"' + name + '" долбоору ачылды'; }
      },
      {
        regex: /^Папка «(.+)» уже содержит проект\. Открыть его\?$/,
        replace: function (_, name) { return '"' + name + '" папкасында долбоор бар. Аны ачасызбы?'; }
      },
      {
        regex: /^В папке «(.+)» нет project\.json\. Создать проект\?$/,
        replace: function (_, name) { return '"' + name + '" папкасында project.json жок. Долбоор түзүлсүнбү?'; }
      },
      {
        regex: /^Проект «(.+)» содержит несохранённые изменения\. Закрыть\?$/,
        replace: function (_, name) { return '"' + name + '" долбоорунда сакталбаган өзгөрүүлөр бар. Жабылсынбы?'; }
      },
      {
        regex: /^Файл «(.+)» уже существует\. Перезаписать\?$/,
        replace: function (_, name) { return '"' + name + '" файлы мурунтан эле бар. Кайра жазылсынбы?'; }
      },
      {
        regex: /^«(.+)» создан$/,
        replace: function (_, name) { return '"' + name + '" түзүлдү'; }
      },
      {
        regex: /^Файл загружен: (.+)$/,
        replace: function (_, name) { return 'Файл жүктөлдү: ' + name; }
      },
      {
        regex: /^Строка (\d+): не распознано «(.+)»$/,
        replace: function (_, line, token) { return line + '-сап: "' + token + '" таанылган жок'; }
      },
      {
        regex: /^Поле «(.+)» не найдено в таблице «(.+)»$/,
        replace: function (_, field, table) { return '"' + field + '" талаасы "' + table + '" таблицасында табылган жок'; }
      },
      {
        regex: /^(\d+) таблиц, (\d+) связей$/,
        replace: function (_, tables, refs) { return tables + ' таблица, ' + refs + ' байланыш'; }
      },
      {
        regex: /^(\d+) ошибок:\n([\s\S]+)$/,
        replace: function (_, count, rest) { return count + ' ката:\n' + rest; }
      },
      {
        regex: /^Скопировано: (\d+) эл\.$/,
        replace: function (_, count) { return 'Көчүрүлдү: ' + count + ' элемент'; }
      },
      {
        regex: /^Вырезано: (\d+) эл\.$/,
        replace: function (_, count) { return 'Кесилди: ' + count + ' элемент'; }
      },
      {
        regex: /^Вставлено: (\d+) эл\.$/,
        replace: function (_, count) { return 'Коюлду: ' + count + ' элемент'; }
      },
      {
        regex: /^Ошибка: (.+)$/,
        replace: function (_, msg) { return 'Ката: ' + msg; }
      },
      {
        regex: /^Ничего не найдено$/,
        replace: function () { return 'Эч нерсе табылган жок'; }
      },
      {
        regex: /^Файл не найден или недоступен\. Нажмите ↻ для обновления дерева\.$/,
        replace: function () { return 'Файл табылган жок же жеткиликсиз. Даракты жаңылоо үчүн ↻ басыңыз.'; }
      },
      {
        regex: /^Сохранено (\d+) файл$/,
        replace: function (_, count) { return count + ' файл сакталды'; }
      },
      {
        regex: /^Сохранено (\d+) файла$/,
        replace: function (_, count) { return count + ' файл сакталды'; }
      },
      {
        regex: /^Сохранено (\d+) файлов$/,
        replace: function (_, count) { return count + ' файл сакталды'; }
      },
      {
        regex: /^Сохранено (\d+) из (\d+) файл$/,
        replace: function (_, saved, total) { return total + ' ичинен ' + saved + ' файл сакталды'; }
      },
      {
        regex: /^Сохранено (\d+) из (\d+) файла$/,
        replace: function (_, saved, total) { return total + ' ичинен ' + saved + ' файл сакталды'; }
      },
      {
        regex: /^Сохранено (\d+) из (\d+) файлов$/,
        replace: function (_, saved, total) { return total + ' ичинен ' + saved + ' файл сакталды'; }
      }
    ]
  };

  function normalizeLocale(locale) {
    return SUPPORTED_LOCALES.indexOf(locale) >= 0 ? locale : null;
  }

  function getQueryLocale() {
    try {
      return normalizeLocale(new URLSearchParams(window.location.search).get('locale'));
    } catch (error) {
      return null;
    }
  }

  function getStoredLocale() {
    try {
      return normalizeLocale(window.localStorage.getItem(LOCALE_STORAGE_KEY));
    } catch (error) {
      return null;
    }
  }

  function setStoredLocale(locale) {
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch (error) {
      return;
    }
  }

  function updateLocaleQuery(locale) {
    try {
      var url = new URL(window.location.href);
      url.searchParams.set('locale', locale);
      window.history.replaceState({}, '', url.toString());
    } catch (error) {
      return;
    }
  }

  function translateExact(text) {
    if (currentLocale === 'ru') {
      return text;
    }

    var dict = TRANSLATIONS[currentLocale];
    if (dict && Object.prototype.hasOwnProperty.call(dict, text)) {
      return dict[text];
    }

    var patterns = PATTERNS[currentLocale];
    if (patterns) {
      for (var i = 0; i < patterns.length; i += 1) {
        var rule = patterns[i];
        if (rule.regex.test(text)) {
          return text.replace(rule.regex, rule.replace);
        }
      }
    }

    return text;
  }

  function translateTextPreservingWhitespace(value) {
    if (!value || currentLocale === 'ru') {
      return value;
    }

    var match = value.match(/^(\s*)([\s\S]*?)(\s*)$/);
    if (!match) {
      return value;
    }

    var translated = translateExact(match[2]);
    return match[1] + translated + match[3];
  }

  function shouldSkipNode(node) {
    if (!node || !node.parentNode || node.parentNode.nodeType !== Node.ELEMENT_NODE) {
      return false;
    }

    var tagName = node.parentNode.tagName;
    return tagName === 'PRE' || tagName === 'CODE' || tagName === 'SCRIPT' || tagName === 'STYLE' || tagName === 'TEXTAREA';
  }

  function localizeTextNode(node) {
    if (shouldSkipNode(node)) {
      return;
    }

    if (typeof node._i18nOriginalText === 'undefined') {
      node._i18nOriginalText = node.textContent;
    }

    node.textContent = currentLocale !== 'ru'
      ? translateTextPreservingWhitespace(node._i18nOriginalText)
      : node._i18nOriginalText;
  }

  function localizeAttribute(element, attributeName) {
    if (!element.hasAttribute(attributeName)) {
      return;
    }

    var storeKey = '_i18nOriginal' + attributeName.charAt(0).toUpperCase() + attributeName.slice(1);
    if (typeof element[storeKey] === 'undefined') {
      element[storeKey] = element.getAttribute(attributeName);
    }

    element.setAttribute(
      attributeName,
      currentLocale !== 'ru' ? translateTextPreservingWhitespace(element[storeKey]) : element[storeKey]
    );
  }

  function localizeTree(root) {
    if (!root) {
      return;
    }

    if (root.nodeType === Node.TEXT_NODE) {
      localizeTextNode(root);
      return;
    }

    if (root.nodeType !== Node.ELEMENT_NODE) {
      return;
    }

    localizeAttribute(root, 'title');
    localizeAttribute(root, 'placeholder');
    localizeAttribute(root, 'aria-label');

    var childNodes = root.childNodes;
    for (var i = 0; i < childNodes.length; i += 1) {
      localizeTree(childNodes[i]);
    }
  }

  function updateLocaleButtons() {
    var ruButton = document.getElementById('localeRu');
    var enButton = document.getElementById('localeEn');
    var kgButton = document.getElementById('localeKg');
    if (!ruButton || !enButton) {
      return;
    }

    ruButton.classList.toggle('active', currentLocale === 'ru');
    enButton.classList.toggle('active', currentLocale === 'en');
    if (kgButton) kgButton.classList.toggle('active', currentLocale === 'kg');
    ruButton.title = currentLocale === 'en' ? 'Russian' : currentLocale === 'kg' ? 'Орусча' : 'Русский';
    enButton.title = 'English';
    if (kgButton) kgButton.title = currentLocale === 'en' ? 'Kyrgyz' : currentLocale === 'kg' ? 'Кыргызча' : 'Кыргызский';
  }

  function getDefaultErDsl() {
    if (currentLocale === 'en') {
      return 'Table users {\n'
        + '  id int [pk]\n'
        + '  username varchar\n'
        + '  email varchar [unique]\n'
        + '  role_id int [ref: > roles.id]\n'
        + '  created_at timestamp\n'
        + '}\n\n'
        + 'Table roles {\n'
        + '  id int [pk]\n'
        + '  name varchar [unique]\n'
        + '  description text\n'
        + '}\n\n'
        + 'Table requests {\n'
        + '  id int [pk]\n'
        + '  title varchar [not null]\n'
        + '  owner_id int [ref: > users.id]\n'
        + '  status_id int [ref: > statuses.id]\n'
        + '  created_at timestamp\n'
        + '}\n\n'
        + 'Table statuses {\n'
        + '  id int [pk]\n'
        + '  name varchar [unique]\n'
        + '}\n\n'
        + 'Ref: requests.status_id > statuses.id';
    }

    if (currentLocale === 'kg') {
      return 'Table koldonuuchular {\n'
        + '  id int [pk]\n'
        + '  login varchar\n'
        + '  email varchar [unique]\n'
        + '  rol_id int [ref: > roldar.id]\n'
        + '  created_at timestamp\n'
        + '}\n\n'
        + 'Table roldar {\n'
        + '  id int [pk]\n'
        + '  name varchar [unique]\n'
        + '  description text\n'
        + '}\n\n'
        + 'Table suroolor {\n'
        + '  id int [pk]\n'
        + '  title varchar [not null]\n'
        + '  owner_id int [ref: > koldonuuchular.id]\n'
        + '  status_id int [ref: > statustar.id]\n'
        + '  created_at timestamp\n'
        + '}\n\n'
        + 'Table statustar {\n'
        + '  id int [pk]\n'
        + '  name varchar [unique]\n'
        + '}\n\n'
        + 'Ref: suroolor.status_id > statustar.id';
    }

    return 'Table polzovateli {\n'
      + '  id int [pk]\n'
      + '  login varchar\n'
      + '  email varchar [unique]\n'
      + '  rol_id int [ref: > roli.id]\n'
      + '  created_at timestamp\n'
      + '}\n\n'
      + 'Table roli {\n'
      + '  id int [pk]\n'
      + '  name varchar [unique]\n'
      + '  description text\n'
      + '}\n\n'
      + 'Table zayavki {\n'
      + '  id int [pk]\n'
      + '  title varchar [not null]\n'
      + '  owner_id int [ref: > polzovateli.id]\n'
      + '  status_id int [ref: > statusy.id]\n'
      + '  created_at timestamp\n'
      + '}\n\n'
      + 'Table statusy {\n'
      + '  id int [pk]\n'
      + '  name varchar [unique]\n'
      + '}\n\n'
      + 'Ref: zayavki.status_id > statusy.id';
  }

  function getErHelpExample() {
    if (currentLocale === 'en') {
      return 'Table users {\n'
        + '  id int [pk]\n'
        + '  name varchar\n'
        + '  email varchar [unique]\n'
        + '  role_id int [ref: > roles.id]\n'
        + '}\n\n'
        + 'Table roles {\n'
        + '  id int [pk]\n'
        + '  name varchar\n'
        + '}\n\n'
        + 'Ref: users.role_id > roles.id';
    }

    if (currentLocale === 'kg') {
      return 'Table koldonuuchular {\n'
        + '  id int [pk]\n'
        + '  name varchar\n'
        + '  email varchar [unique]\n'
        + '  rol_id int [ref: > roldar.id]\n'
        + '}\n\n'
        + 'Table roldar {\n'
        + '  id int [pk]\n'
        + '  name varchar\n'
        + '}\n\n'
        + 'Ref: koldonuuchular.rol_id > roldar.id';
    }

    return 'Table polzovateli {\n'
      + '  id int [pk]\n'
      + '  name varchar\n'
      + '  email varchar [unique]\n'
      + '  rol_id int [ref: > roli.id]\n'
      + '}\n\n'
      + 'Table roli {\n'
      + '  id int [pk]\n'
      + '  name varchar\n'
      + '}\n\n'
      + 'Ref: polzovateli.rol_id > roli.id';
  }

  function getErPlaceholder() {
    if (currentLocale === 'en') {
      return 'Table users {\n  id int [pk]\n  name varchar\n  email varchar [unique]\n}';
    }

    if (currentLocale === 'kg') {
      return 'Table koldonuuchular {\n  id int [pk]\n  name varchar\n  email varchar [unique]\n}';
    }

    return 'Table polzovateli {\n  id int [pk]\n  name varchar\n  email varchar [unique]\n}';
  }

  function updateLocaleSpecificContent() {
    var erEditor = document.getElementById('erDslEditor');
    if (erEditor) {
      erEditor.setAttribute('placeholder', getErPlaceholder());
    }

    var erHelpExample = document.querySelector('#erHelp pre');
    if (erHelpExample) {
      erHelpExample.textContent = getErHelpExample();
    }
  }

  function getWindowTitle(mode) {
    if (mode === 'er') {
      if (currentLocale === 'en') return 'ER Diagram — Local editor';
      if (currentLocale === 'kg') return 'ER Diagram — Жергиликтүү редактор';
      return 'ER Diagram — Локальный редактор';
    }

    if (currentLocale === 'en') return 'BPMN Modeler — Local editor';
    if (currentLocale === 'kg') return 'BPMN Modeler — Жергиликтүү редактор';
    return 'BPMN Modeler — Локальный редактор';
  }

  function applyLocaleToDom(root) {
    if (isApplyingLocale) {
      return;
    }

    isApplyingLocale = true;
    document.documentElement.lang = currentLocale;
    document.title = getWindowTitle(window.currentMode || 'bpmn');
    localizeTree(root || document.body);
    updateLocaleSpecificContent();
    updateLocaleButtons();
    isApplyingLocale = false;
  }

  function scheduleApplyLocale(root) {
    if (localeApplyScheduled) {
      return;
    }

    localeApplyScheduled = true;
    window.requestAnimationFrame(function () {
      localeApplyScheduled = false;
      applyLocaleToDom(root || document.body);
    });
  }

  function notifyParent(locale) {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: 'modeler-locale-change', locale: locale }, '*');
    }
  }

  function setModelerLocale(locale, options) {
    var normalized = normalizeLocale(locale);
    if (!normalized) {
      return;
    }

    var settings = Object.assign(
      {
        notifyParent: false,
        persist: true,
        updateQuery: true
      },
      options || {}
    );

    currentLocale = normalized;

    if (settings.persist) {
      setStoredLocale(normalized);
    }

    if (settings.updateQuery) {
      updateLocaleQuery(normalized);
    }

    applyLocaleToDom(document.body);

    if (settings.notifyParent) {
      notifyParent(normalized);
    }
  }

  function initializeLocaleObserver() {
    if (localeObserver || !document.body) {
      return;
    }

    localeObserver = new MutationObserver(function () {
      if (currentLocale !== 'ru') {
        scheduleApplyLocale(document.body);
      }
    });

    localeObserver.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true
    });
  }

  function getDefaultBpmnLabels() {
    if (currentLocale === 'en') {
      return {
        start: 'Start',
        task: 'Task 1',
        gateway: 'Condition?',
        optionA: 'Option A',
        optionB: 'Option B',
        end: 'End',
        yes: 'Yes',
        no: 'No'
      };
    }

    if (currentLocale === 'kg') {
      return {
        start: 'Башталыш',
        task: 'Тапшырма 1',
        gateway: 'Шарт?',
        optionA: 'Вариант A',
        optionB: 'Вариант B',
        end: 'Аяктоо',
        yes: 'Ооба',
        no: 'Жок'
      };
    }

    return {
      start: 'Начало',
      task: 'Задача 1',
      gateway: 'Условие?',
      optionA: 'Вариант A',
      optionB: 'Вариант B',
      end: 'Конец',
      yes: 'Да',
      no: 'Нет'
    };
  }

  function initializeModelerLocale() {
    currentLocale = getQueryLocale() || getStoredLocale() || 'ru';
    document.documentElement.lang = currentLocale;
    initializeLocaleObserver();
    applyLocaleToDom(document.body);
  }

  window.getModelerLocale = function () {
    return currentLocale;
  };

  window.localizeText = function (text) {
    return translateExact(text);
  };

  window.applyLocaleToDom = applyLocaleToDom;
  window.getModelerWindowTitle = getWindowTitle;
  window.getDefaultBpmnLabels = getDefaultBpmnLabels;
  window.getDefaultErDsl = getDefaultErDsl;
  window.initializeModelerLocale = initializeModelerLocale;

  var nativeConfirm = window.confirm.bind(window);
  var nativePrompt = window.prompt.bind(window);

  window.confirm = function (message) {
    return nativeConfirm(currentLocale !== 'ru' ? translateExact(message) : message);
  };

  window.prompt = function (message, defaultValue) {
    return nativePrompt(currentLocale !== 'ru' ? translateExact(message) : message, defaultValue);
  };

  window.setModelerLocale = function (locale) {
    setModelerLocale(locale, {
      notifyParent: true,
      persist: true,
      updateQuery: true
    });
  };
})();
