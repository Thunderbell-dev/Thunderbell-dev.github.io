const guildId = '1342428692093079562';
const apiUrl = `https://discord.com/api/guilds/${guildId}/widget.json`;
const permanentInvite = 'https://discord.gg/46jYCVRv9f';

async function fetchServerData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Server widget is disabled or invalid ID.");
        
        const data = await response.json();
        const onlineMembers = data.presence_count;

        console.log(data.members?.filter(member => member.game && member.game.name));
        
        const playingNostale = data.members?.filter(member => 
            member.game && member.game.name === "NosTale"
        ).length || 0;
        
        document.getElementById("discord-widget").innerHTML = `
            <div class="online"><i id="discord-icon" class="fab fa-discord"></i> Online: ${onlineMembers}</div>
            <div class="online-nostale"><img id="nostale-icon" src="/images/public/icons/nostale/font/NosTale_N.webp" alt="NostaleIcon"> Ingame: ${playingNostale}</div>
            <a href="${permanentInvite}" target="_blank" class="hyperlink discord-invite">Join Now</a>
        `;
    } catch (error) {
        document.getElementById("discord-widget").innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

fetchServerData();