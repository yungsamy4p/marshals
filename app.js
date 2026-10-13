// CODIGO ABIERTO BY YUNG SAMY - ADAPTADO AL USMS PARA MYSTICOS RP
// DISCORD: likeadversario
// GITHUB: https://github.com/yungsamy4p/fdn-portal
// INSTAGRAM: https://www.instagram.com/yungsamy4p

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1549160935011127407/d0Tx7icC44tqc3a8awAAUHRXLZXt-iEGn9eSgawlP5mruHrWxtpTS_2sdJgDumq2Qlg5";

document.getElementById('enlistForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const submitBtn = document.getElementById('submitBtn');
  const statusMsg = document.getElementById('statusMessage');

  const callsign = document.getElementById('callsign').value;
  const discord = document.getElementById('discord').value;
  const division = document.getElementById('division').value;
  const motivation = document.getElementById('motivation').value;

  submitBtn.disabled = true;
  submitBtn.innerText = "TRANSMITIENDO EXPEDIENTE FEDERAL...";
  statusMsg.innerText = "";

  // ID ti Rol ti Superbision / Direksion ti Distrito ti USMS
  const ROL_SUPERVISION_USMS_ID = "1543494798986575953";

  const payload = {
    username: "DESPACHO CENTRAL // U.S. MARSHALS SERVICE",
    avatar_url: "https://cdn.discordapp.com/attachments/1543495355318927392/1545704842108866630/logofdnnewgen2.png", // Masukatan iti logo ti USMS
    content: `⚖️ **NOTIFICACIÓN DE POSTULACIÓN / LEGAJO DE SERVICIO** <@&${ROL_SUPERVISION_USMS_ID}>`,
    embeds: [
      {
        title: "⭐ NUEVA SOLICITUD DE ADHESIÓN AL USMS RECIBIDA",
        description: "Se ha radicado un nuevo expediente de postulación para incorporarse al **United States Marshals Service** en el Distrito Judicial de Mysticos RP.",
        color: 0x1a2b4c, // Maris asul a pederal ti USMS (#1a2b4c)
        fields: [
          { name: "👤 Identificador / Nombre IC", value: `\`${callsign}\``, inline: true },
          { name: "📋 Contacto de Discord", value: `\`${discord}\``, inline: true },
          { name: "🛡️ División Solicitada", value: `\`${division}\``, inline: false },
          { name: "📜 Declaración de Intenciones / Antecedentes", value: motivation, inline: false }
        ],
        footer: {
          text: "United States Marshals Service • Registro Procesal Automático | Mysticos RP"
        },
        timestamp: new Date().toISOString()
      }
    ]
  };

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      statusMsg.style.color = "#55ff55";
      statusMsg.innerText = "TRANSMISIÓN EXITOSA: Su expediente ha sido remitido formalmente a la Supervisión del USMS.";
      document.getElementById('enlistForm').reset();
    } else {
      throw new Error("Fallo en la respuesta del servidor");
    }
  } catch (error) {
    statusMsg.style.color = "#ff5555";
    statusMsg.innerText = "ERROR CRÍTICO: No se pudo enlazar con la terminal central de datos del USMS.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = "TRANSMITIR SOLICITUD AL DESPACHO";
  }
});