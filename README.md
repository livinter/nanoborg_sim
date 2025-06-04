# nanoborg_sim
Erstelle eine vollständige HTML-Seite mit eingebettetem JavaScript, das eine Würmchen-Simulation realisiert:
1. Canvas:
   * Größe: 256 × 256 Pixel
   * Rand: 1 px, blau
   * Hintergrund: weiß
2. Würmchen:
   * Anzahl: 3000
   * Größe: 2 × 1 px
   * Jedes Würmchen besitzt:
     • Ein Datenfeld mit 32 Float-Werten
     – data\[0] = 1.0 (fix)
     – data\[1] = 0.0 (fix)
     – data\[2] = -1.0 (fix)
     – data\[3] = (in-front) anderer wurm +1 hinterteil -1 forderteil
     – data\[4] = (in-right anderer wurm +1 hinterteil -1 forderteil
     – data\[5] = (in-left)anderer wurm +1 hinterteil -1 forderteil
     – data\[6] = (in-front) rand 0 oder 1
     – data\[7] = (in-right)rand
     – data\[8] = (in-left)rand
     – data\[9…29] = init mit zufällige Werte in \[-1,1]
     – data\[30] =  (out) move forward
     – data\[31] =  (out) rotiere
     • Ein Programm mit 32 Befehlen. Jeder Befehl hat:
     – alpha (init mit Zufallswert in \[0,1])
     – src1, src2 (Index 0–29), dst (Index 9–31)
     – Operation: data\[dst] += alpha × (data\[src1] × data\[src2] – data\[dst])
     • Eine Kopf-Richtung (0°, 90°, 180°, 270°)
     • Eine Position (x, y) zufällig im Canvas
     • Einen Score zwischen 0 und 1, initial 0.5
3. Bewegungslogik pro Frame:
   * Führe alle Befehle des Programms aus
   * Drehung: aus data\[2] → Winkeländerung ±90°
   * Schritt vorwärts: 1 px in Richtung der neuen Kopf-Richtung
4. Kollisionen:
   * kann nicht auf rand gehen
   * Jeder Wurm speichert seine letzte Position als „Kopf“
   * Trifft Kopf von Wurm A auf Schwanz von Wurm B:
     • A.score += 0.02 (max. 1.0)
     • B.score -= 0.02 (min. 0.0)
5. Rekombination:
   * Würmer mit Score > 0.9 („high“) und < 0.1 („low“)
   * Jeder „high“-Spender gibt 10 % seines Programmcodes und 10 % seiner Daten (außer Index 0 & 1) an jeden „low“-Empfänger weiter
   * Für jeden übertragenen Befehl: 0.1 % Chance auf Mutation (Befehl neu randomisieren)
6. Animation:
   * Nutze `requestAnimationFrame` für kontinuierliche Simulation
   * Zeichne alle Würmchen gruen hinterteil kopf tuerkis  (2 × 1 px)
Gib den kompletten HTML- und JavaScript-Code aus, der diese Spezifikation umsetzt.
Wenn ein Wurm im HIGH-Modus ist, soll er durch rote Farbe ersichtlich sein. Außerdem füge Schieberegler hinzu, mit denen man das Programm mit anderen Parametern initialisieren kann

nach einem programm transfer das "low" wuermchen auf eine neue random position setzen

der Programmcode-Transfer soll nur vom high wuermche zum low wuermchen geschehen die sich getroffenn haben also 1 zu 1