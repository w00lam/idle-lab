async function loadTeam() {
    const grid = document.getElementById("team-grid");

    try {
        const res = await fetch("members/members.json");
        const { members } = await res.json();

        for (const fileName of members) {
            const memberRes = await fetch(`members/${fileName}`);
            const data = await memberRes.json();

            const card = document.createElement("div");
            card.className = "member-card";
            card.innerHTML = `
                <img src="${data.profileImage}" class="profile-img" onerror="this.src='image/profile_image.png'">
                <h2 class="name">${data.name}</h2>
                <span class="sub-name">${data.subName}</span>
                <p class="quote">"${data.introduction.quote}"</p>
                
                <div class="section-title">Strengths</div>
                <div class="tags">${data.strengths.map((s) => `<span class="tag">${s}</span>`).join("")}</div>

                <div class="section-title">Skills</div>
                <div class="skills">
                    ${data.skills
                .map(
                    (s) => `
                        <div class="skill-item">
                            <div class="skill-info"><span>${s.name}</span><span>${s.progress}%</span></div>
                            <div class="progress-bar"><div class="progress-fill" style="width: ${s.progress}%"></div></div>
                        </div>
                    `,
                )
                .join("")}
                </div>
            `;
            grid.appendChild(card);
        }
    } catch (e) {
        console.error("데이터 로드 실패!", e);
    }
}

document.addEventListener("DOMContentLoaded", loadTeam);
