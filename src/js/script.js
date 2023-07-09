window.addEventListener('DOMContentLoaded', () => {
    let calc_display = document.querySelector('.calc-display'),
        keyboard_num = document.querySelectorAll('.keyboard-num'),
        keyboard_op = document.querySelectorAll('.keyboard-op'),
        dot_flag = true,
        eq_flag = false;

    document.querySelector('.keyboard-del').addEventListener('click', () => {
        calc_display.innerText = calc_display.innerText.slice(0, -1);
        if (eq_flag) set_display_text('');
    });

    document.querySelector('.keyboard-reset').addEventListener('click', () => {
        set_display_text('');
    });

    document.querySelector('.keyboard-dot').addEventListener('click', () => {
        if (eq_flag) set_display_text(',');

        if (calc_display.innerText.slice(-1) != ',' && dot_flag) {
            calc_display.innerText += ',';
            dot_flag = false;
        }
    });

    document.querySelector('.keyboard-eq').addEventListener('click', () => {
        if (/\d/.test(calc_display.innerText.slice(-1))) {
            set_display_text(
                math.evaluate(calc_display.innerText.replace(/x/g, '*').replace(/,/g, '.'))
            );
            eq_flag = true;
            dot_flag = true;
        }
        calc_display.scrollTo(-calc_display.clientWidth, 0);
    });

    keyboard_num.forEach(el =>
        el.addEventListener('click', e => {
            if (eq_flag) set_display_text(e.target.innerText);
            else calc_display.innerText += e.target.innerText;
        })
    );

    keyboard_op.forEach(el =>
        el.addEventListener('click', e => {
            let s = calc_display.innerText.slice(-1);
            dot_flag = true;
            eq_flag = false;
            if (/\d/.test(s) && calc_display.innerText != '') {
                calc_display.innerText += e.target.innerText;
            } else if (
                /\+|-|x|\//.test(s) &&
                s != e.target.innerText &&
                calc_display.innerText.length > 1
            ) {
                set_display_text(calc_display.innerText.slice(0, -1) + e.target.innerText);
            } else if (e.target.innerText == '-' && !calc_display.innerText)
                calc_display.innerText += '-';
        })
    );

    function set_display_text(str) {
        calc_display.innerText = String(str).replace(/\./g, ',');
        if (eq_flag) eq_flag = false;
    }

    let theme_swither = document.querySelector('.theme-swither'),
        theme = '1';

    if (!localStorage.getItem('theme')) localStorage.setItem('theme', theme);
    else {
        theme = localStorage.getItem('theme');
        theme_swither.value = theme;
    }

    document.querySelector('html').classList.add(`theme${theme}`);

    theme_swither.addEventListener('input', e => {
        theme = e.target.value;
        localStorage.setItem('theme', theme);
        document.querySelector('html').className = `theme${theme}`;
    });
});
