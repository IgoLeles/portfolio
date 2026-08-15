import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type Priority = 'Alta' | 'Média' | 'Baixa';
type Filter = 'Todas' | 'Hoje' | 'Pendentes' | 'Concluídas';

type Task = {
  id: number;
  title: string;
  priority: Priority;
  due: string;
  completed: boolean;
};

const storageKey = 'portfolio-task-list-demo';

const initialTasks: Task[] = [
  { id: 1, title: 'Reunião com o cliente', priority: 'Alta', due: 'Hoje', completed: false },
  { id: 2, title: 'Finalizar proposta comercial', priority: 'Alta', due: 'Hoje', completed: false },
  { id: 3, title: 'Enviar relatório de desempenho', priority: 'Média', due: 'Amanhã', completed: false },
  { id: 4, title: 'Atualizar documentação do projeto', priority: 'Média', due: '24/05', completed: false },
  { id: 5, title: 'Revisar telas do aplicativo', priority: 'Baixa', due: '22/05', completed: true },
];

const filters: Filter[] = ['Todas', 'Hoje', 'Pendentes', 'Concluídas'];
const priorities: Priority[] = ['Alta', 'Média', 'Baixa'];

function buildShareText(tasks: Task[]) {
  const pending = tasks.filter((task) => !task.completed);
  const completed = tasks.filter((task) => task.completed);
  const topPending = pending.slice(0, 5).map((task) => `- ${task.title} (${task.priority})`);

  return [
    'Resumo da lista de tarefas',
    `Pendentes: ${pending.length}`,
    `Concluídas: ${completed.length}`,
    '',
    ...topPending,
  ].join('\n');
}

export default function ProjetoListaTarefas() {
  const assetBase = import.meta.env.BASE_URL;
  const conceptImage = `${assetBase}img/todo-share-concept.png`;
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = window.localStorage.getItem(storageKey);

    if (!savedTasks) {
      return initialTasks;
    }

    try {
      return JSON.parse(savedTasks) as Task[];
    } catch {
      return initialTasks;
    }
  });
  const [filter, setFilter] = useState<Filter>('Todas');
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('Média');

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === 'Hoje') {
        return task.due === 'Hoje';
      }

      if (filter === 'Pendentes') {
        return !task.completed;
      }

      if (filter === 'Concluídas') {
        return task.completed;
      }

      return true;
    });
  }, [filter, tasks]);

  const summary = useMemo(() => ({
    today: tasks.filter((task) => task.due === 'Hoje').length,
    pending: tasks.filter((task) => !task.completed).length,
    completed: tasks.filter((task) => task.completed).length,
  }), [tasks]);

  const shareUrl = `https://wa.me/?text=${encodeURIComponent(buildShareText(tasks))}`;

  function addTask() {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    setTasks((currentTasks) => [
      {
        id: Date.now(),
        title: trimmedTitle,
        priority,
        due: 'Hoje',
        completed: false,
      },
      ...currentTasks,
    ]);
    setTitle('');
    setPriority('Média');
  }

  function toggleTask(taskId: number) {
    setTasks((currentTasks) => (
      currentTasks.map((task) => (
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ))
    ));
  }

  function removeTask(taskId: number) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  }

  return (
    <section className="case-page todo-page">
      <Link to="/projetos" className="back-link">Voltar para projetos</Link>

      <div className="case-hero">
        <div>
          <span className="eyebrow">Projeto intermediário</span>
          <h1>Lista de Tarefas</h1>
          <p>
            Um organizador com cadastro, conclusão, filtros e persistência local. A evolução
            pensada para o portfólio inclui compartilhamento do resumo da lista por link,
            sem depender de API oficial ou credenciais externas.
          </p>
          <div className="case-actions">
            <a href={shareUrl} target="_blank" rel="noreferrer">
              Compartilhar resumo
            </a>
          </div>
          <p className="integration-note">
            O botão usa um link de compartilhamento do WhatsApp para abrir o app ou
            WhatsApp Web com o resumo preenchido. Não utiliza webhook, API Business
            nem credenciais externas.
          </p>
        </div>

        <aside className="case-summary">
          <div>
            <strong>{summary.today}</strong>
            <span>para hoje</span>
          </div>
          <div>
            <strong>{summary.pending}</strong>
            <span>pendentes</span>
          </div>
          <div>
            <strong>{summary.completed}</strong>
            <span>concluídas</span>
          </div>
        </aside>
      </div>

      <div className="todo-layout">
        <article className="todo-app-panel">
          <div className="todo-toolbar">
            <div className="todo-filters" aria-label="Filtros da lista">
              {filters.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={filter === item ? 'active' : ''}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="todo-form">
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  addTask();
                }
              }}
              placeholder="Nova tarefa"
              aria-label="Nova tarefa"
            />
            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value as Priority)}
              aria-label="Prioridade"
            >
              {priorities.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
            <button type="button" onClick={addTask}>Adicionar</button>
          </div>

          <div className="todo-list">
            {filteredTasks.map((task) => (
              <div className={`todo-item${task.completed ? ' completed' : ''}`} key={task.id}>
                <button
                  type="button"
                  className="todo-check"
                  aria-label={task.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? '✓' : ''}
                </button>
                <div>
                  <strong>{task.title}</strong>
                  <span>{task.due}</span>
                </div>
                <small className={`priority-${task.priority.toLowerCase()}`}>{task.priority}</small>
                <button
                  type="button"
                  className="todo-remove"
                  aria-label="Remover tarefa"
                  onClick={() => removeTask(task.id)}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        </article>

        <article className="case-panel case-visual todo-concept-panel">
          <div>
            <h2>Imagem conceito</h2>
            <p>
              A imagem mostra a direção visual planejada: tarefas com filtros, prioridades,
              datas, painel de resumo e compartilhamento simples de um resumo da lista.
            </p>
          </div>
          <a href={conceptImage} target="_blank" rel="noreferrer" aria-label="Abrir conceito visual da Lista de Tarefas">
            <img src={conceptImage} alt="Conceito visual da Lista de Tarefas com compartilhamento de resumo" />
            <span>Clique para ampliar</span>
          </a>
        </article>
      </div>

      <div className="case-grid case-wide">
        <article className="case-panel">
          <h2>O que foi feito</h2>
          <ul>
            <li>Cadastro e remoção de tarefas com atualização imediata da interface.</li>
            <li>Marcação de tarefas concluídas e filtros por status ou prazo.</li>
            <li>Dados salvos no navegador com LocalStorage.</li>
            <li>Compartilhamento por link com resumo textual da lista, sem backend.</li>
          </ul>
        </article>

        <article className="case-panel">
          <h2>Próximos passos</h2>
          <p>
            A base pode evoluir para histórico, categorias, datas personalizadas, testes
            automatizados e, em uma versão avançada separada, integração real via backend
            com APIs externas.
          </p>
          <div className="case-tags">
            <span>React</span>
            <span>TypeScript</span>
            <span>LocalStorage</span>
            <span>UX</span>
            <span>Compartilhamento</span>
          </div>
        </article>
      </div>
    </section>
  );
}
