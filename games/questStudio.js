export class QuestStudio {
  constructor(quests, badges) {
    this.quests = quests;
    this.badges = badges;
    this.completed = JSON.parse(localStorage.getItem("completedQuests") || "[]");
  }

  isCompleted(id) {
    return this.completed.includes(id);
  }

  checkQuest(id) {
    const quest = this.quests.find(q => q.id === id);
    if (!quest) return false;

    const conditionsMet = quest.conditions.every(cond => {
      return this.badges.some(b => b.id === cond);
    });

    if (conditionsMet && !this.isCompleted(id)) {
      this.completed.push(id);
      localStorage.setItem("completedQuests", JSON.stringify(this.completed));
      this.unlockReward(quest);
      return true;
    }

    return false;
  }

  unlockReward(quest) {
    alert(`🎉 Ви завершили квест: ${quest.title}`);
    if (quest.reward === "newLevel") {
      document.getElementById("level2").style.display = "block";
    }
    if (quest.reward === "badge") {
      this.issueBadge(quest.badgeId);
    }
  }

  issueBadge(badgeId) {
    const badge = {
      id: badgeId,
      title: `Новий бейдж: ${badgeId}`,
      image: `${badgeId}.png`,
      timestamp: Date.now()
    };
    this.badges.push(badge);
    localStorage.setItem("badges", JSON.stringify(this.badges));
  }
}
