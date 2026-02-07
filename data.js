// Arduino Projects Book — all 15 projects (tutorial, steps, quiz, checklist)
const ARDUINO_PROJECTS = [
  {
    id: 1,
    title: 'Get to Know Your Tools',
    summary: 'Introduction to the Arduino board, breadboard, jumper wires, LED, resistor, and push button. No code — just wiring.',
    components: ['Arduino UNO', 'Breadboard', 'Jumper wires', 'Push button', '5mm Red LED', '220Ω resistor', 'USB cable'],
    steps: [
      'Place the Arduino UNO on the table and identify the digital pins (0–13), 5V, GND, and the USB port.',
      'Place the breadboard in front of you. Understand the two power rails (+, -) and the terminal rows.',
      'Insert the 220Ω resistor: one leg in the breadboard, the other to a row that will connect to the LED.',
      'Insert the LED: long leg (anode) to the resistor row, short leg (cathode) to another row; connect that row to GND.',
      'Connect a jumper from Arduino pin 13 to the resistor row (so current flows: pin 13 → resistor → LED → GND).',
      'Insert the push button across the center gap. Connect one side to 5V and the other to pin 2 (and optionally a 10kΩ pull-down to GND).',
      'Connect Arduino GND to the breadboard ground rail. Plug in the USB cable and verify the built-in LED on pin 13 can be lit.'
    ],
    quiz: [
      {
        question: 'Which leg of an LED is the anode (positive)?',
        options: ['The shorter leg', 'The longer leg', 'Either leg', 'The flat side'],
        correctIndex: 1,
        fixExplanation: 'The longer leg is the anode (positive). Current flows from anode to cathode. If you wire it backwards, the LED won’t light — swap the legs and try again.'
      },
      {
        question: 'Why do we use a 220Ω resistor with the LED?',
        options: ['To make the LED brighter', 'To limit current and protect the LED', 'To change the color', 'The book says so'],
        correctIndex: 1,
        fixExplanation: 'Without a resistor, too much current would flow and damage the LED. The resistor limits current to a safe value. Never connect an LED directly to 5V or GND without a resistor.'
      },
      {
        question: 'What is the breadboard’s center gap for?',
        options: ['Decoration', 'To separate the two sides so components don’t short', 'To hold the Arduino', 'There is no gap'],
        correctIndex: 1,
        fixExplanation: 'The gap breaks the connection between the two sides. Components like push buttons and ICs sit across the gap so each pin is on its own row. Rows on the same side of the gap are connected.'
      }
    ],
    buildChecklist: [
      'LED long leg (anode) connected toward 5V/pin side, short leg to GND',
      '220Ω resistor in series with the LED',
      'Jumper from Arduino pin 13 to resistor/LED',
      'Breadboard GND rail connected to Arduino GND',
      'Push button wired so one side goes to 5V and the other to pin 2',
      'No loose wires; connections match the diagram in the PDF'
    ]
  },
  {
    id: 2,
    title: 'Spaceship Interface',
    summary: 'Build a control panel with LEDs that you switch on and off with code — your first sketch with output.',
    components: ['Arduino UNO', 'Breadboard', '3× LEDs (e.g. green, yellow, red)', '3× 220Ω resistors', 'Jumper wires', 'USB cable'],
    steps: [
      'Set up three LEDs on the breadboard, each with its own 220Ω resistor in series.',
      'Connect each LED’s resistor side to a digital pin: e.g. pins 11, 12, 13.',
      'Connect all LED cathodes (short legs) to the GND rail; connect the rail to Arduino GND.',
      'In the Arduino IDE, create a new sketch. Use pinMode(11, OUTPUT); (and 12, 13) in setup().',
      'In loop(), use digitalWrite(11, HIGH); to turn an LED on and digitalWrite(11, LOW); to turn it off.',
      'Add delays with delay(1000); so the LEDs blink in a pattern. Upload and test.'
    ],
    quiz: [
      {
        question: 'What does pinMode(11, OUTPUT) do?',
        options: ['Turns pin 11 on', 'Sets pin 11 as an input', 'Configures pin 11 to send voltage (output)', 'Reads pin 11'],
        correctIndex: 2,
        fixExplanation: 'pinMode(pin, OUTPUT) tells the Arduino that this pin will be used to drive an LED or other output. You must call it once in setup() before using digitalWrite() on that pin.'
      },
      {
        question: 'What does digitalWrite(11, HIGH) do?',
        options: ['Reads the pin', 'Sets pin 11 to 5V (on)', 'Sets pin 11 to 0V (off)', 'Measures voltage'],
        correctIndex: 1,
        fixExplanation: 'digitalWrite(pin, HIGH) sets the pin to 5V (on); digitalWrite(pin, LOW) sets it to 0V (off). Use HIGH to light an LED connected through a resistor to that pin.'
      }
    ],
    buildChecklist: [
      'Three LEDs each with a 220Ω resistor in series',
      'Each LED anode (long leg) toward the resistor; cathode to GND',
      'Pins 11, 12, 13 (or as in PDF) connected to the resistor sides',
      'Breadboard GND connected to Arduino GND',
      'Sketch uses pinMode(... OUTPUT) and digitalWrite(... HIGH/LOW)',
      'Wiring matches the Spaceship Interface diagram in the PDF'
    ]
  },
  {
    id: 3,
    title: 'Love-o-Meter',
    summary: 'Use a temperature sensor (TMP36) to measure temperature and show the result with LEDs — introduction to analog input.',
    components: ['Arduino UNO', 'Breadboard', 'TMP36 temperature sensor', '3× LEDs', '3× 220Ω resistors', 'Jumper wires', 'USB cable'],
    steps: [
      'Place the TMP36 flat side toward you. Left pin = 5V, middle = analog output, right = GND. Connect to 5V, A0, and GND.',
      'Set up three LEDs with resistors on pins 2, 3, 4 (or as in the book).',
      'In setup(), use pinMode for the LED pins and optionally Serial.begin(9600) for debugging.',
      'In loop(), read the sensor: int reading = analogRead(A0); then convert to voltage and temperature (see PDF formula).',
      'Use if/else to turn on 1, 2, or 3 LEDs based on temperature thresholds. Upload and warm the sensor (finger) to test.'
    ],
    quiz: [
      {
        question: 'Which function reads the TMP36 on analog pin A0?',
        options: ['digitalRead(A0)', 'analogRead(A0)', 'readTemperature(A0)', 'pinMode(A0, INPUT)'],
        correctIndex: 1,
        fixExplanation: 'analogRead(A0) returns a value 0–1023 representing the voltage on A0. The TMP36 outputs a voltage that varies with temperature; you convert that number to degrees (see the PDF formula).'
      },
      {
        question: 'What is the TMP36 middle pin connected to?',
        options: ['5V', 'GND', 'An analog pin (e.g. A0)', 'A digital pin only'],
        correctIndex: 2,
        fixExplanation: 'The middle pin is the analog output. Connect it to A0 (or another analog pin) so the Arduino can read the voltage and compute temperature. Left = 5V, right = GND.'
      }
    ],
    buildChecklist: [
      'TMP36 oriented correctly: left 5V, middle to A0, right GND',
      'Three LEDs with resistors on the pins used in the sketch',
      'analogRead(A0) used to read the sensor',
      'Temperature conversion formula from the PDF applied correctly',
      'LEDs light in sequence as temperature increases',
      'Wiring matches the Love-o-Meter diagram in the PDF'
    ]
  },
  {
    id: 4,
    title: 'Color Mixing Lamp',
    summary: 'Use three photoresistors (red, green, blue) to mix light and control an RGB LED.',
    components: ['Arduino UNO', 'Breadboard', 'RGB LED', '3× photoresistors', '3× 10kΩ resistors', 'Jumper wires', 'USB cable'],
    steps: [
      'Wire the three photoresistors: one leg to 5V, the other to a 10kΩ resistor to GND; junction to A0, A1, A2.',
      'Wire the RGB LED: common cathode to GND; red, green, blue anodes through 220Ω resistors to pins 9, 10, 11 (PWM).',
      'In setup(), set those pins as OUTPUT and optionally Serial.begin(9600).',
      'In loop(), read A0, A1, A2 with analogRead(); map the values to 0–255 for PWM.',
      'Use analogWrite(9, redValue); and similarly for green and blue. Upload and shine different colors on the photoresistors.'
    ],
    quiz: [
      {
        question: 'Why do we use analogWrite() for the RGB LED in this project?',
        options: ['To read the sensors', 'To get varying brightness (PWM), not just on/off', 'To use analog pins', 'We use digitalWrite()'],
        correctIndex: 1,
        fixExplanation: 'analogWrite() uses PWM to dim the LED. Values 0–255 control brightness. That way we can mix red, green, and blue at different levels to get many colors, not just 8.'
      }
    ],
    buildChecklist: [
      'Three photoresistors with 10kΩ pull-downs to A0, A1, A2',
      'RGB LED common cathode to GND; R, G, B anodes via 220Ω to PWM pins (e.g. 9, 10, 11)',
      'analogRead() for sensors and analogWrite() for LED',
      'Mapping from sensor range to 0–255 for PWM',
      'Wiring matches the Color Mixing Lamp diagram in the PDF'
    ]
  },
  {
    id: 5,
    title: 'Mood Cue',
    summary: 'A servo motor moves an indicator to show your “mood” — introduction to the Servo library.',
    components: ['Arduino UNO', 'Breadboard', 'Servo motor', 'Jumper wires', 'USB cable'],
    steps: [
      'Connect the servo: brown/black to GND, red to 5V, orange/yellow to a digital pin (e.g. 9).',
      'In the sketch, add #include <Servo.h> and create a Servo object. In setup(), attach it to the pin.',
      'Use myServo.write(0); to move to 0°, myServo.write(90); for 90°, myServo.write(180); for 180°.',
      'Use a potentiometer or buttons to choose an angle and write it to the servo. Upload and test.'
    ],
    quiz: [
      {
        question: 'What does myServo.write(90) do?',
        options: ['Turns the servo 90 times', 'Moves the servo to 90 degrees', 'Sets speed to 90', 'Reads position'],
        correctIndex: 1,
        fixExplanation: 'write(angle) sets the servo shaft position in degrees (typically 0–180). Use 90 for middle. If the servo doesn’t move, check power (5V and GND) and signal wire to the correct pin.'
      }
    ],
    buildChecklist: [
      'Servo power (red) to 5V, ground (brown/black) to GND',
      'Signal wire (orange/yellow) to the pin used in attach()',
      '#include <Servo.h> and attach(pin) in setup()',
      'write(angle) used to set position (0–180°)',
      'Wiring matches the Mood Cue diagram in the PDF'
    ]
  },
  {
    id: 6,
    title: 'Light Theremin',
    summary: 'A photoresistor controls the pitch of a tone played on a piezo buzzer — like a theremin.',
    components: ['Arduino UNO', 'Breadboard', 'Photoresistor', '10kΩ resistor', 'Piezo buzzer', 'Jumper wires', 'USB cable'],
    steps: [
      'Wire photoresistor: one leg to 5V, other to 10kΩ to GND; junction to A0.',
      'Connect piezo: one leg to a digital pin (e.g. 8), other to GND (or through a small resistor).',
      'In loop(), read A0 with analogRead(), map the value to a frequency (e.g. 100–4000 Hz).',
      'Use tone(8, frequency); to play the tone. Optionally use noTone(8) when not playing. Upload and cover/uncover the sensor.'
    ],
    quiz: [
      {
        question: 'What does tone(pin, frequency) do?',
        options: ['Reads a sound', 'Plays a tone at the given frequency (Hz) on the pin', 'Sets volume', 'Records audio'],
        correctIndex: 1,
        fixExplanation: 'tone(pin, frequency) generates a square wave on that pin at the given frequency in Hz. The piezo buzzer converts it to sound. Use noTone(pin) to stop. Only one tone at a time on most boards.'
      }
    ],
    buildChecklist: [
      'Photoresistor with 10kΩ to GND; junction to A0',
      'Piezo connected to a digital pin and GND',
      'analogRead(A0) mapped to a frequency range',
      'tone(pin, frequency) used in loop()',
      'Wiring matches the Light Theremin diagram in the PDF'
    ]
  },
  {
    id: 7,
    title: 'Keyboard Instrument',
    summary: 'Use buttons as keys to play different notes on a piezo buzzer.',
    components: ['Arduino UNO', 'Breadboard', '4× push buttons', '4× 10kΩ resistors', 'Piezo buzzer', 'Jumper wires', 'USB cable'],
    steps: [
      'Wire four buttons: one side to 5V, other side to 10kΩ to GND and to pins 2, 3, 4, 5.',
      'Connect piezo to pin 8 and GND.',
      'In loop(), read each button with digitalRead(). If a button is HIGH, play the corresponding note with tone(8, frequency).',
      'Use different frequencies for each key (e.g. 262, 294, 330, 349 Hz for C, D, E, F). Use noTone(8) when no button is pressed.'
    ],
    quiz: [
      {
        question: 'Why use a 10kΩ resistor with each push button?',
        options: ['To make the button work faster', 'As a pull-down so the pin reads LOW when the button is not pressed', 'To protect the LED', 'To increase voltage'],
        correctIndex: 1,
        fixExplanation: 'When the button is open, the pin would “float” without a pull-down. The 10kΩ to GND pulls the pin to LOW. When you press the button, 5V is connected and the pin reads HIGH.'
      }
    ],
    buildChecklist: [
      'Four buttons with pull-down resistors to pins 2, 3, 4, 5',
      'Piezo on pin 8 and GND',
      'digitalRead() for each button',
      'tone(8, frequency) for each key; noTone(8) when no key pressed',
      'Wiring matches the Keyboard Instrument diagram in the PDF'
    ]
  },
  {
    id: 8,
    title: 'Digital Hourglass',
    summary: 'An hourglass that uses an LED array and a tilt sensor to flip the “sand” (LEDs) when you turn it over.',
    components: ['Arduino UNO', 'Breadboard', 'Multiple LEDs', '220Ω resistors', 'Tilt sensor (ball switch)', 'Jumper wires', 'USB cable'],
    steps: [
      'Wire a row of LEDs (e.g. 10) with 220Ω resistors to digital pins.',
      'Connect the tilt sensor: one leg to 5V, other to 10kΩ to GND and to a digital pin (e.g. 2).',
      'In loop(), check the tilt sensor. When orientation flips, “pour” the sand: turn off LEDs from one end and turn on from the other over time.',
      'Use millis() for timing instead of delay() so the tilt can be read while the sand is running.'
    ],
    quiz: [
      {
        question: 'Why might we use millis() instead of delay() in this project?',
        options: ['millis() is faster', 'delay() blocks; millis() lets us check the tilt sensor while timing', 'delay() doesn’t work', 'To save memory'],
        correctIndex: 1,
        fixExplanation: 'delay() pauses the whole program. With millis() we can track elapsed time and still run other code (like reading the tilt sensor) so we can flip the hourglass at any moment.'
      }
    ],
    buildChecklist: [
      'All LEDs with resistors on their pins',
      'Tilt sensor with pull-down to a digital pin',
      'Logic to “pour” LEDs from one end to the other',
      'Tilt read to trigger flip when turned over',
      'Wiring matches the Digital Hourglass diagram in the PDF'
    ]
  },
  {
    id: 9,
    title: 'Motorized Pinwheel',
    summary: 'Control a DC motor with a transistor so the Arduino can spin a pinwheel.',
    components: ['Arduino UNO', 'Breadboard', 'DC motor', 'Transistor (e.g. TIP120)', 'Diode (1N4001)', '220Ω resistor', 'Jumper wires', 'External power optional'],
    steps: [
      'Wire the transistor: base through 220Ω to a digital pin (e.g. 9), emitter to GND, collector to motor. Motor other leg to 5V or external supply.',
      'Place the diode across the motor (cathode to 5V side, anode to transistor) to protect from back-EMF.',
      'Use analogWrite(9, speed) with 0–255 to control speed with PWM. Upload and test.'
    ],
    quiz: [
      {
        question: 'Why is the diode placed across the motor?',
        options: ['To make it spin faster', 'To protect the circuit from voltage spikes when the motor stops (back-EMF)', 'To light an LED', 'To measure speed'],
        correctIndex: 1,
        fixExplanation: 'When you turn the motor off, it can generate a voltage spike (back-EMF). The diode gives that spike a safe path so it doesn’t damage the transistor or Arduino.'
      }
    ],
    buildChecklist: [
      'Transistor base to digital pin via 220Ω; emitter to GND',
      'Motor between collector and 5V (or external supply)',
      'Diode across motor, polarity correct for back-EMF',
      'analogWrite(pin, speed) for PWM speed control',
      'Wiring matches the Motorized Pinwheel diagram in the PDF'
    ]
  },
  {
    id: 10,
    title: 'Zoetrope',
    summary: 'A spinning zoetrope with LEDs that create animation when the motor spins at the right speed.',
    components: ['Arduino UNO', 'Breadboard', 'DC motor', 'Transistor', 'Diode', 'Multiple LEDs', 'Resistors', 'Jumper wires'],
    steps: [
      'Build the motor circuit as in Project 9 (transistor, diode, PWM pin).',
      'Add a ring of LEDs on separate pins so they can be turned on/off in sequence.',
      'Drive the motor at a constant speed and flash the LEDs in sequence so that when the zoetrope spins, the eye sees animation.',
      'Tune the delay between LED steps to match the motor speed (trial and error or use a sensor).'
    ],
    quiz: [
      {
        question: 'What makes the zoetrope create the illusion of motion?',
        options: ['Magic', 'Rapidly flashing LEDs in sequence while the strip spins (persistence of vision)', 'The motor only', 'The resistor'],
        correctIndex: 1,
        fixExplanation: 'Persistence of vision means our eyes blend rapid images. By spinning the strip and lighting one “frame” at a time in the same position, we see smooth motion. Timing LED sequence with rotation is key.'
      }
    ],
    buildChecklist: [
      'Motor circuit with transistor and diode as in Project 9',
      'LEDs arranged in a circle or strip on separate pins',
      'Sequence of LED on/off in code',
      'Motor speed and LED timing tuned so animation is clear',
      'Wiring matches the Zoetrope diagram in the PDF'
    ]
  },
  {
    id: 11,
    title: 'Crystal Ball',
    summary: 'A “magic” crystal ball that shows a random message when you touch it — using a tilt sensor or touch.',
    components: ['Arduino UNO', 'Breadboard', 'LCD or serial output', 'Tilt or touch sensor', 'Jumper wires', 'USB cable'],
    steps: [
      'Wire the tilt sensor (or touch) to a digital pin with pull-down.',
      'If using an LCD, connect it as per the book (I2C or parallel). Otherwise use Serial output to the computer.',
      'Store an array of messages. In loop(), when the sensor is triggered, pick a random message with random() and display it.',
      'Use randomSeed(analogRead(0)) at start so the sequence varies. Add a short delay so one shake = one message.'
    ],
    quiz: [
      {
        question: 'Why use randomSeed(analogRead(0))?',
        options: ['To read the sensor', 'To seed the random number generator so random() gives different sequences each run', 'To set the baud rate', 'To save memory'],
        correctIndex: 1,
        fixExplanation: 'random() by itself gives the same sequence every time you reset. Reading an unused analog pin (noise) gives a different seed each time, so you get different “fortune” messages.'
      }
    ],
    buildChecklist: [
      'Tilt or touch sensor wired with pull-down',
      'LCD or Serial used for output',
      'Array of messages and random() to choose one',
      'randomSeed() used for variation',
      'Wiring matches the Crystal Ball diagram in the PDF'
    ]
  },
  {
    id: 12,
    title: 'Knock Lock',
    summary: 'A lock that opens (e.g. servo or LED) when it detects the correct knock pattern using a piezo as a sensor.',
    components: ['Arduino UNO', 'Breadboard', 'Piezo element (as sensor)', 'Servo or LED', 'Resistors', 'Jumper wires', 'USB cable'],
    steps: [
      'Connect the piezo between an analog pin and GND (sometimes with a large resistor). Knocks create voltage spikes.',
      'Connect the servo (or LED) as in earlier projects.',
      'In loop(), read the analog pin. When the value exceeds a threshold, record the time with millis().',
      'Store the gaps between knocks. Compare the pattern (e.g. short-short-long) to the secret; if it matches, trigger the servo/LED.'
    ],
    quiz: [
      {
        question: 'How does the piezo work as a knock sensor?',
        options: ['It sends sound', 'When you tap it, it generates a voltage that we can read on an analog pin', 'It measures light', 'It only works as a buzzer'],
        correctIndex: 1,
        fixExplanation: 'A piezo can work both ways: voltage makes it move (sound); movement (knock) makes a voltage. So we read that voltage with analogRead() and detect when it goes above a threshold.'
      }
    ],
    buildChecklist: [
      'Piezo connected to analog pin (and GND; resistor if in book)',
      'Servo or LED connected for “unlock” output',
      'analogRead() with threshold to detect knocks',
      'Timing between knocks stored and compared to secret pattern',
      'Wiring matches the Knock Lock diagram in the PDF'
    ]
  },
  {
    id: 13,
    title: 'Touchy-feely Lamp',
    summary: 'A lamp that turns on when you touch a conductive material — using the CapacitiveSensor library.',
    components: ['Arduino UNO', 'Breadboard', 'LED or lamp', 'Resistor', 'Conductive material (foil, wire)', 'Jumper wires', 'USB cable', 'CapacitiveSensor library'],
    steps: [
      'Install the CapacitiveSensor library (Sketch → Include Library → Manage Libraries, search CapacitiveSensor).',
      'Wire send pin to a resistor (e.g. 1MΩ), then to the touch sensor (foil); receive pin to another pin. See library docs or PDF.',
      'In code, create CapacitiveSensor and read with sensor.capacitiveSensor(30). When value is above a threshold, turn the LED on.',
      'Tune the threshold for your setup. Use a high-value resistor (e.g. 1MΩ–10MΩ) for better sensitivity.'
    ],
    quiz: [
      {
        question: 'What does the CapacitiveSensor library measure?',
        options: ['Temperature', 'Light', 'Capacitance change when you touch the sensor (your body adds capacitance)', 'Resistance'],
        correctIndex: 2,
        fixExplanation: 'When you touch the foil, your body adds capacitance. The library measures how much the capacitance changed and returns a number. Higher value = touch detected. Adjust threshold for your setup.'
      }
    ],
    buildChecklist: [
      'CapacitiveSensor library installed',
      'Send pin → resistor → touch surface; receive pin as per library',
      'capacitiveSensor() read and compared to threshold',
      'LED or lamp turns on when touch is detected',
      'Wiring matches the Touchy-feely Lamp diagram in the PDF'
    ]
  },
  {
    id: 14,
    title: 'Tweak the Arduino Logo',
    summary: 'Use the Arduino as a keyboard (HID) to send keypresses to the computer — change the Arduino logo in the IDE.',
    components: ['Arduino UNO (or Leonardo/Micro for HID)', 'USB cable', 'Computer'],
    steps: [
      'Note: Full keyboard emulation is easier on Arduino Leonardo/Micro. On UNO you may use Serial to send characters.',
      'If using Leonardo/Micro: use Keyboard library. In setup(), Keyboard.begin(). In loop(), Keyboard.print("text"); or Keyboard.press(key).',
      'Trigger the send with a button or after a delay. Open a text editor and run the sketch to see the characters appear.',
      'To “tweak the logo,” you might open the Arduino IDE and have the sketch type a new logo in the right place (advanced).'
    ],
    quiz: [
      {
        question: 'Which Arduino boards can act as a USB keyboard (HID) out of the box?',
        options: ['Only UNO', 'Leonardo, Micro, and some others have native USB HID; UNO does not', 'All boards', 'None'],
        correctIndex: 1,
        fixExplanation: 'Leonardo and Micro have a different USB chip that can act as a keyboard or mouse. UNO uses a separate USB-serial chip, so it doesn’t do HID by default. You can still send text via Serial to the PC.'
      }
    ],
    buildChecklist: [
      'Correct board selected (Leonardo/Micro for Keyboard library)',
      'Keyboard.begin() in setup() if using Keyboard library',
      'Trigger (button/delay) to send keys or text',
      'Sketch tested in a text editor or IDE',
      'Steps match the Tweak the Arduino Logo section in the PDF'
    ]
  },
  {
    id: 15,
    title: 'Hacking Buttons',
    summary: 'Take apart a commercial device (e.g. a mouse or keyboard) and use its buttons with the Arduino.',
    components: ['Arduino UNO', 'Breadboard', 'Jumper wires', 'Device to hack (old mouse, keyboard, etc.)', 'Screwdriver'],
    steps: [
      'Open the device carefully and find the button pads or switches. Identify common ground and each button’s contact.',
      'Solder or clip wires to the button contacts. Connect one side to GND and the other to a digital pin (with optional pull-up).',
      'On the Arduino, use the internal pull-up: pinMode(pin, INPUT_PULLUP). When the button is pressed, the pin reads LOW.',
      'In loop(), digitalRead() each pin. React to LOW (button pressed). Upload and use the hacked buttons in your project.'
    ],
    quiz: [
      {
        question: 'With INPUT_PULLUP, when is the pin read as LOW?',
        options: ['Never', 'When the button is pressed (connecting the pin to GND)', 'When the button is released', 'When voltage is 5V'],
        correctIndex: 1,
        fixExplanation: 'INPUT_PULLUP connects an internal resistor to 5V, so the pin is normally HIGH. When you press the button, you connect the pin to GND, so it reads LOW. So “pressed” = LOW with pull-up.'
      }
    ],
    buildChecklist: [
      'Device opened and button contacts identified',
      'Wires connected: one side GND, other to digital pin',
      'pinMode(pin, INPUT_PULLUP) for each button',
      'digitalRead() treats LOW as pressed',
      'Wiring and code match the Hacking Buttons section in the PDF'
    ]
  }
];

// PDF base URL for reference
const PDF_BOOK_URL = 'https://www.eitkw.com/wp-content/uploads/2020/03/Arduino_Projects_Book.pdf';
