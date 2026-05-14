const state = {
  currentView: "discover",
  activeFilter: "全部",
  search: "",
  persona: "verified",
  selectedConversation: "c1",
  likes: new Map(),
  bookmarks: new Map()
};

const personas = {
  verified: {
    label: "Bai · Verified Researcher",
    short: "Bai",
    trust: "认证研究者"
  },
  handle: {
    label: "@lumen_builder",
    short: "@lumen_builder",
    trust: "社区用户名"
  }
};

const researchCards = [
  {
    id: "card-1",
    kind: "paper",
    field: "Robotics",
    title: "Robotic Foundation Models for Long-Horizon Mobile Manipulation",
    hook: "机器人基础模型，离真正做家务还差什么？",
    coverCode: "RFM",
    coverTone: "blue",
    venue: "arXiv preprint · 2026",
    authors: "L. Chen, M. Park, A. Singh",
    sourceUrl: "https://arxiv.org/",
    doiUrl: "https://doi.org/",
    codeUrl: "https://github.com/",
    guide:
      "作者导读：这项工作尝试把视觉语言模型、动作先验和长期任务规划放在同一个机器人控制流程里，重点不是单步抓取，而是跨房间、多阶段任务。",
    why:
      "适合关注机器人基础模型、长时程规划、Sim2Real 和具身智能评测的人。",
    tags: ["Foundation Models", "Robotics", "Planning"],
    comments: [
      {
        by: "Ming · PhD Student",
        trust: "学术邮箱认证",
        text: "最有意思的是 failure case，模型在开放词汇任务里能解释错误，但还不能稳定修正动作。"
      },
      {
        by: "@sim2real_notes",
        trust: "社区用户名",
        text: "想看作者补充不同机械臂和场景迁移的复现细节。"
      }
    ],
    stats: { likes: 128, bookmarks: 46 }
  },
  {
    id: "card-2",
    kind: "note",
    field: "AI",
    title: "A small note on why retrieval quality beats prompt length",
    hook: "RAG 失败，可能不是 prompt 不够长",
    coverCode: "RAG",
    coverTone: "coral",
    venue: "Research Note · Lumen Agora",
    authors: "@latent_reader",
    sourceUrl: "https://doi.org/",
    codeUrl: "https://github.com/",
    guide:
      "研究笔记：很多 RAG 失败不是模型不够强，而是检索阶段把相似文本当成相关证据。这个笔记比较了 dense retrieval、hybrid search 和 reranking 的错误类型。",
    why:
      "适合做 RAG、学术搜索、知识库问答和论文推荐的人。",
    tags: ["RAG", "Retrieval", "Evaluation"],
    comments: [
      {
        by: "Rui · Research Engineer",
        trust: "机构邮箱认证",
        text: "建议加入 citation-aware reranking，否则学术场景会把综述和原始贡献混在一起。"
      }
    ],
    stats: { likes: 93, bookmarks: 61 }
  },
  {
    id: "card-3",
    kind: "reproduction",
    field: "Robotics",
    title: "Reproducing diffusion policy on a low-cost arm",
    hook: "低成本机械臂复现，最容易翻车的是这里",
    coverCode: "DP",
    coverTone: "green",
    venue: "Reproduction Log · Open Lab",
    authors: "Open Manipulation Group",
    sourceUrl: "https://arxiv.org/",
    codeUrl: "https://github.com/",
    guide:
      "复现记录：原论文在高质量演示数据上效果很好，但低成本机械臂的数据噪声会让动作分布明显发散。记录里整理了相机标定、动作归一化和数据清洗的影响。",
    why:
      "适合想用低成本硬件复现机器人学习论文的学生和开源实验室。",
    tags: ["Reproduction", "Diffusion Policy", "Open Hardware"],
    comments: [
      {
        by: "Dr. Allen · PI",
        trust: "认证导师",
        text: "这类复现非常重要，建议把失败设置也做成 benchmark。"
      }
    ],
    stats: { likes: 171, bookmarks: 82 }
  },
  {
    id: "card-4",
    kind: "opportunity",
    field: "AI",
    title: "Looking for contributors: open evaluation set for scientific agents",
    hook: "想一起做科学智能体评测吗？",
    coverCode: "EVAL",
    coverTone: "gold",
    venue: "Collaboration · 4 open roles",
    authors: "Lumen Research Commons",
    sourceUrl: "https://github.com/",
    codeUrl: "https://github.com/",
    guide:
      "合作招募：项目希望构建一个科学智能体评测集，覆盖论文阅读、实验设计、代码复现和引用追踪。欢迎有 NLP、HCI、科研工具经验的人加入。",
    why:
      "适合想参与开源研究基础设施、LLM eval 和科研工作流的人。",
    tags: ["Open Source", "Scientific Agents", "Evaluation"],
    comments: [
      {
        by: "@bench_builder",
        trust: "社区用户名",
        text: "可以从机器人和生物两个领域先做小样本试点。"
      }
    ],
    stats: { likes: 76, bookmarks: 34 }
  },
  {
    id: "card-5",
    kind: "paper",
    field: "HCI",
    title: "Designing scholarly social spaces without turning them into popularity contests",
    hook: "学术社区为什么不能只看点赞？",
    coverCode: "GOV",
    coverTone: "teal",
    venue: "CHI Workshop · 2026",
    authors: "S. Rivera, N. Bai",
    sourceUrl: "https://doi.org/",
    doiUrl: "https://doi.org/",
    guide:
      "作者导读：这篇文章讨论学术社区为什么不能照搬消费内容平台的热度逻辑，并提出基于证据、复现、作者回应和领域维护者的治理机制。",
    why:
      "适合关注开放科学、社区治理、学术社交和知识基础设施的人。",
    tags: ["HCI", "Governance", "Open Science"],
    comments: [
      {
        by: "Yuan · MSc Student",
        trust: "学术邮箱认证",
        text: "希望平台能把 verified-only filter 和普通讨论同时保留。"
      }
    ],
    stats: { likes: 112, bookmarks: 57 }
  },
  {
    id: "card-6",
    kind: "note",
    field: "Open Science",
    title: "How a lab page could become a living research portfolio",
    hook: "课题组主页能不能变成活的作品集？",
    coverCode: "LAB",
    coverTone: "ink",
    venue: "Product Note · Lumen Agora",
    authors: "Bai · Verified Researcher",
    sourceUrl: "https://orcid.org/",
    guide:
      "产品想法：课题组主页不只是介绍页面，而是一个持续更新的研究组合，包括论文导读、复现状态、开放职位、成员兴趣和正在寻找的合作。",
    why:
      "适合导师、课题组管理员、学生申请者和研究基础设施建设者。",
    tags: ["Lab Page", "Academic Network", "Opportunities"],
    comments: [
      {
        by: "Prof. Kim",
        trust: "机构邮箱认证",
        text: "如果能把机会帖和论文方向自动关联，学生申请会更高效。"
      }
    ],
    stats: { likes: 67, bookmarks: 29 }
  }
];

const filters = ["全部", "AI", "Robotics", "HCI", "Open Science"];

const opportunities = [
  {
    id: "opp-1",
    title: "PhD opening: Robot learning and embodied AI",
    org: "Open Robotics Lab · US",
    type: "PhD",
    trust: "机构邮箱认证",
    text: "寻找有机器人学习、视觉语言模型或强化学习背景的申请者。申请者可以附上 Lumen Agora 复现记录或研究卡片。"
  },
  {
    id: "opp-2",
    title: "RA collaboration: scientific agent benchmark",
    org: "Lumen Research Commons · Remote",
    type: "RA",
    trust: "开源项目",
    text: "欢迎本科生和研究生参与数据集设计、论文任务标注和开源评测工具开发。"
  },
  {
    id: "opp-3",
    title: "Postdoc: human-centered AI infrastructure",
    org: "Civic Computation Group · EU",
    type: "Postdoc",
    trust: "认证课题组",
    text: "研究方向包括开放科学平台、可信推荐、研究者身份系统和公共知识治理。"
  }
];

const profiles = [
  {
    name: "Bai",
    role: "Builder · Lumen Agora",
    initials: "BA",
    tags: ["Open Science", "Robotics", "Product"],
    text: "正在搭建一个结合研究发现、学术网络和机会连接的开放学术公共基础设施。"
  },
  {
    name: "Open Manipulation Group",
    role: "Lab · Robotics",
    initials: "OM",
    tags: ["Robot Learning", "Reproduction", "Hardware"],
    text: "维护低成本机器人复现记录，并开放 RA、访问学生和开源项目机会。"
  },
  {
    name: "@latent_reader",
    role: "Community Handle · AI Notes",
    initials: "LR",
    tags: ["RAG", "Evaluation", "Reading Notes"],
    text: "关注科研智能体、文献检索和 citation-aware evaluation。"
  }
];

let conversations = [
  {
    id: "c1",
    title: "关于 scientific agent benchmark 的合作",
    with: "Lumen Research Commons",
    source: "来自合作机会",
    messages: [
      {
        by: "Lumen Research Commons",
        text: "看到你收藏了 scientific agent benchmark。你对论文阅读任务还是复现实验任务更感兴趣？"
      },
      {
        by: personas.verified.short,
        text: "我更想先从机器人论文复现任务做一个小样本。"
      }
    ]
  },
  {
    id: "c2",
    title: "低成本机械臂复现细节",
    with: "Open Manipulation Group",
    source: "来自复现记录",
    messages: [
      {
        by: "Open Manipulation Group",
        text: "可以交流一下相机标定和动作归一化，我们也在整理一份公开 checklist。"
      }
    ]
  }
];

const feedGrid = document.querySelector("#feedGrid");
const filterGroup = document.querySelector("#filterGroup");
const searchInput = document.querySelector("#searchInput");
const detailPanel = document.querySelector("#detailPanel");
const panelBackdrop = document.querySelector("#panelBackdrop");
const personaSelect = document.querySelector("#personaSelect");

function kindLabel(kind) {
  const labels = {
    paper: "论文导读",
    note: "研究笔记",
    reproduction: "复现记录",
    opportunity: "合作机会"
  };
  return labels[kind] || kind;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function filteredCards() {
  const query = state.search.trim().toLowerCase();

  return researchCards.filter((card) => {
    const matchesFilter = state.activeFilter === "全部" || card.field === state.activeFilter;
    const haystack = [
      card.title,
      card.hook,
      card.venue,
      card.authors,
      card.guide,
      card.why,
      card.tags.join(" ")
    ]
      .join(" ")
      .toLowerCase();
    return matchesFilter && (!query || haystack.includes(query));
  });
}

function renderFilters() {
  filterGroup.innerHTML = filters
    .map(
      (filter) => `
        <button class="filter-pill ${filter === state.activeFilter ? "active" : ""}" data-filter="${escapeHtml(filter)}">
          ${escapeHtml(filter)}
        </button>
      `
    )
    .join("");
}

function renderFeed() {
  const cards = filteredCards();

  if (!cards.length) {
    feedGrid.innerHTML = `<p class="empty-state">没有找到匹配的研究卡片。</p>`;
    return;
  }

  feedGrid.innerHTML = cards
    .map((card) => {
      const likes = card.stats.likes + (state.likes.get(card.id) || 0);
      const bookmarks = card.stats.bookmarks + (state.bookmarks.get(card.id) || 0);

      return `
        <article class="research-card">
          <button class="card-cover ${escapeHtml(card.coverTone)}" data-open="${card.id}" aria-label="Open ${escapeHtml(card.hook)}">
            <span class="cover-kicker">${escapeHtml(card.field)} · ${kindLabel(card.kind)}</span>
            <span class="cover-code">${escapeHtml(card.coverCode)}</span>
            <span class="cover-foot">${escapeHtml(card.tags[0])}</span>
          </button>
          <div class="compact-body">
            <h2>${escapeHtml(card.hook)}</h2>
            <p class="paper-title-small">${escapeHtml(card.title)}</p>
            <div class="card-topline">
              <span>${escapeHtml(card.authors)}</span>
              <span>${likes} 赞</span>
              <span>${bookmarks} 收藏</span>
            </div>
            <div class="tag-row compact-tags">
              ${card.tags.slice(0, 2).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
            </div>
          </div>
          <div class="card-actions">
            <button class="text-action" data-open="${card.id}">点开看</button>
            <a class="link-button" href="${card.sourceUrl}" target="_blank" rel="noreferrer">打开原文</a>
            <button class="text-action" data-like="${card.id}">点赞</button>
            <button class="text-action" data-bookmark="${card.id}">收藏</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderOpportunities() {
  const list = document.querySelector("#opportunityList");
  list.innerHTML = opportunities
    .map(
      (item) => `
        <article class="opportunity-card">
          <div>
            <div class="opportunity-meta">
              <span class="badge opportunity">${escapeHtml(item.type)}</span>
              <span>${escapeHtml(item.org)}</span>
              <span>${escapeHtml(item.trust)}</span>
            </div>
            <h2>${escapeHtml(item.title)}</h2>
            <p>${escapeHtml(item.text)}</p>
          </div>
          <button class="secondary-action" data-message="${escapeHtml(item.org)}" data-topic="${escapeHtml(item.title)}">私聊了解</button>
        </article>
      `
    )
    .join("");
}

function renderProfiles() {
  const grid = document.querySelector("#profileGrid");
  grid.innerHTML = profiles
    .map(
      (profile) => `
        <article class="profile-card">
          <div class="profile-avatar">${escapeHtml(profile.initials)}</div>
          <div>
            <h2>${escapeHtml(profile.name)}</h2>
            <div class="profile-meta">${escapeHtml(profile.role)}</div>
          </div>
          <p>${escapeHtml(profile.text)}</p>
          <div class="tag-row">
            ${profile.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
          </div>
          <button class="secondary-action" data-message="${escapeHtml(profile.name)}" data-topic="Research profile">发起私聊</button>
        </article>
      `
    )
    .join("");
}

function renderMessages() {
  const list = document.querySelector("#conversationList");
  const detail = document.querySelector("#conversationDetail");

  list.innerHTML = conversations
    .map(
      (conversation) => `
        <button class="conversation-card ${conversation.id === state.selectedConversation ? "active" : ""}" data-conversation="${conversation.id}">
          <strong>${escapeHtml(conversation.title)}</strong>
          <span class="message-meta">${escapeHtml(conversation.with)} · ${escapeHtml(conversation.source)}</span>
        </button>
      `
    )
    .join("");

  const selected = conversations.find((conversation) => conversation.id === state.selectedConversation);

  if (!selected) {
    detail.innerHTML = `<p class="empty-state">选择一个对话开始交流。</p>`;
    return;
  }

  detail.innerHTML = `
    <div>
      <h2>${escapeHtml(selected.title)}</h2>
      <p class="card-summary">${escapeHtml(selected.with)} · ${escapeHtml(selected.source)}</p>
    </div>
    ${selected.messages
      .map(
        (message) => `
          <div class="message-bubble">
            <div class="message-meta">${escapeHtml(message.by)}</div>
            <p>${escapeHtml(message.text)}</p>
          </div>
        `
      )
      .join("")}
    <form class="comment-form" data-reply-conversation="${selected.id}">
      <textarea placeholder="写下合作想法、问题或下一步计划"></textarea>
      <button class="comment-submit" type="submit">发送</button>
    </form>
  `;
}

function renderIdentity() {
  const panel = document.querySelector("#identityPanel");
  panel.innerHTML = `
    <article class="identity-card">
      <span class="badge paper">Verified Scholar Identity</span>
      <h2>Bai · Verified Researcher</h2>
      <p>用于认领论文、发布作者导读、正式回应、发布机会和管理课题组主页。</p>
      <ul class="trust-list">
        <li><span>学术邮箱</span><strong>待接入</strong></li>
        <li><span>ORCID</span><strong>待接入</strong></li>
        <li><span>GitHub</span><strong>待接入</strong></li>
      </ul>
    </article>
    <article class="identity-card">
      <span class="badge note">Community Handle</span>
      <h2>@lumen_builder</h2>
      <p>用于普通评论、提问、复现交流和轻量讨论。前台不公开真实认证身份，但平台保留必要责任链。</p>
      <ul class="trust-list">
        <li><span>默认评论身份</span><strong>可切换</strong></li>
        <li><span>认证筛选</span><strong>支持</strong></li>
        <li><span>反滥用记录</span><strong>平台可见</strong></li>
      </ul>
    </article>
    <article class="identity-card">
      <span class="badge reproduction">Governance</span>
      <h2>开放访问，分层权限</h2>
      <p>普通人可以浏览和参与讨论；高信任行为需要邮箱、ORCID、GitHub 或机构认证。</p>
      <ul class="trust-list">
        <li><span>浏览</span><strong>开放</strong></li>
        <li><span>评论</span><strong>账号登录</strong></li>
        <li><span>招聘/认领论文</span><strong>认证身份</strong></li>
      </ul>
    </article>
  `;
}

function openDetail(cardId) {
  const card = researchCards.find((item) => item.id === cardId);
  if (!card) return;

  detailPanel.innerHTML = `
    <div class="detail-header">
      <button class="detail-close" aria-label="Close detail panel">×</button>
      <div class="card-topline">
        <span class="badge ${card.kind}">${kindLabel(card.kind)}</span>
        <span>${escapeHtml(card.field)}</span>
        <span>${escapeHtml(card.venue)}</span>
      </div>
      <h2>${escapeHtml(card.hook)}</h2>
      <p class="paper-title-small">${escapeHtml(card.title)}</p>
      <div class="profile-meta">${escapeHtml(card.authors)}</div>
    </div>
    <div class="detail-body">
      <section class="detail-section">
        <h3>原创导读</h3>
        <p>${escapeHtml(card.guide)}</p>
        <p>${escapeHtml(card.why)}</p>
      </section>
      <section class="detail-section">
        <h3>原文出处</h3>
        <div class="source-list">
          <a class="link-button" href="${card.sourceUrl}" target="_blank" rel="noreferrer">Publisher / arXiv</a>
          ${card.doiUrl ? `<a class="link-button" href="${card.doiUrl}" target="_blank" rel="noreferrer">DOI</a>` : ""}
          ${card.codeUrl ? `<a class="link-button" href="${card.codeUrl}" target="_blank" rel="noreferrer">Code</a>` : ""}
        </div>
      </section>
      <section class="detail-section">
        <h3>讨论</h3>
        <div class="comment-list" id="commentList">
          ${card.comments
            .map(
              (comment) => `
                <article class="comment">
                  <div class="comment-meta">
                    <strong>${escapeHtml(comment.by)}</strong>
                    <span>${escapeHtml(comment.trust)}</span>
                  </div>
                  <p>${escapeHtml(comment.text)}</p>
                </article>
              `
            )
            .join("")}
        </div>
        <form class="comment-form" data-comment-card="${card.id}">
          <textarea placeholder="以当前身份参与讨论"></textarea>
          <button class="comment-submit" type="submit">发表评论</button>
        </form>
      </section>
      <section class="detail-section">
        <h3>进一步连接</h3>
        <button class="secondary-action" data-message="${escapeHtml(card.authors)}" data-topic="${escapeHtml(card.title)}">围绕这个想法私聊</button>
      </section>
    </div>
  `;

  detailPanel.classList.add("open");
  detailPanel.setAttribute("aria-hidden", "false");
  panelBackdrop.hidden = false;
}

function closeDetail() {
  detailPanel.classList.remove("open");
  detailPanel.setAttribute("aria-hidden", "true");
  panelBackdrop.hidden = true;
}

function switchView(view) {
  state.currentView = view;
  document.querySelectorAll(".view").forEach((element) => {
    element.classList.toggle("active", element.id === view);
  });
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view);
  });
}

function createConversation(withName, topic) {
  const id = `c${conversations.length + 1}`;
  conversations = [
    {
      id,
      title: `关于 ${topic} 的交流`,
      with: withName,
      source: "来自兴趣私聊",
      messages: [
        {
          by: personas[state.persona].short,
          text: `你好，我对「${topic}」很感兴趣，想进一步交流可能的合作或新想法。`
        }
      ]
    },
    ...conversations
  ];
  state.selectedConversation = id;
  renderMessages();
  switchView("messages");
  closeDetail();
}

function wireEvents() {
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const navButton = target.closest("[data-view]");
    if (navButton) {
      switchView(navButton.dataset.view);
      return;
    }

    const filterButton = target.closest("[data-filter]");
    if (filterButton) {
      state.activeFilter = filterButton.dataset.filter;
      renderFilters();
      renderFeed();
      return;
    }

    const openButton = target.closest("[data-open]");
    if (openButton) {
      openDetail(openButton.dataset.open);
      return;
    }

    const likeButton = target.closest("[data-like]");
    if (likeButton) {
      const id = likeButton.dataset.like;
      state.likes.set(id, (state.likes.get(id) || 0) + 1);
      renderFeed();
      return;
    }

    const bookmarkButton = target.closest("[data-bookmark]");
    if (bookmarkButton) {
      const id = bookmarkButton.dataset.bookmark;
      state.bookmarks.set(id, (state.bookmarks.get(id) || 0) + 1);
      renderFeed();
      return;
    }

    const closeButton = target.closest(".detail-close");
    if (closeButton) {
      closeDetail();
      return;
    }

    const messageButton = target.closest("[data-message]");
    if (messageButton) {
      createConversation(messageButton.dataset.message, messageButton.dataset.topic || "research idea");
      return;
    }

    const conversationButton = target.closest("[data-conversation]");
    if (conversationButton) {
      state.selectedConversation = conversationButton.dataset.conversation;
      renderMessages();
    }
  });

  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;

    const commentCardId = form.dataset.commentCard;
    const replyConversationId = form.dataset.replyConversation;
    const textarea = form.querySelector("textarea");
    const text = textarea?.value.trim();

    if (!text) {
      event.preventDefault();
      return;
    }

    if (commentCardId) {
      event.preventDefault();
      const card = researchCards.find((item) => item.id === commentCardId);
      if (card) {
        card.comments.push({
          by: personas[state.persona].short,
          trust: personas[state.persona].trust,
          text
        });
        openDetail(commentCardId);
      }
    }

    if (replyConversationId) {
      event.preventDefault();
      const conversation = conversations.find((item) => item.id === replyConversationId);
      if (conversation) {
        conversation.messages.push({
          by: personas[state.persona].short,
          text
        });
        renderMessages();
      }
    }
  });

  searchInput.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderFeed();
  });

  personaSelect.addEventListener("change", (event) => {
    state.persona = event.target.value;
  });

  panelBackdrop.addEventListener("click", closeDetail);
}

function init() {
  renderFilters();
  renderFeed();
  renderOpportunities();
  renderProfiles();
  renderMessages();
  renderIdentity();
  wireEvents();
}

init();
