// Photo focus picker for the website editor (Sveltia CMS). Click or drag on the photo to choose
// the part to keep in view, and the previews show how it will be cropped in each shape the site
// uses. It saves "x% y%" (a CSS object-position), the format the site already reads.
//
// Field options in config.yml (widget: focus):
//   image_field    the photo it applies to, as a key path in the same entry, e.g. image or approach.insetImage
//   shapes         crops to preview: [{ label: Page header, ratio: 4 / 3 }, …]
//   default_focus  what the site uses when the field is blank, e.g. "50% 0%" for headshots (default "50% 50%")
(() => {
  const React = globalThis.__SVELTIA_CMS_REACT__;
  const CMS = globalThis.CMS;
  if (!React || !CMS) return;
  const { createElement: h, useEffect, useState } = React;

  const opt = (field, key) => {
    const value = typeof field?.get === 'function' ? field.get(key) : field?.[key];
    return typeof value?.toJS === 'function' ? value.toJS() : value;
  };

  const keywords = { left: 0, top: 0, center: 50, centre: 50, right: 100, bottom: 100 };
  const toNumber = (part) => (part in keywords ? keywords[part] : Number.parseFloat(part));
  const clamp = (n) => Math.min(100, Math.max(0, Math.round(n)));

  /** "50% 30%" → { x: 50, y: 30 }. One value sets x only, as in CSS (y stays centred). */
  const parse = (value, fallback) => {
    const parts = String(value ?? '').trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return value === fallback ? { x: 50, y: 50 } : parse(fallback, fallback);
    const [a, b = 'center'] = parts[0] === 'top' || parts[0] === 'bottom' ? [parts[1] ?? 'center', parts[0]] : parts;
    const x = toNumber(a);
    const y = toNumber(b);
    return { x: Number.isFinite(x) ? clamp(x) : 50, y: Number.isFinite(y) ? clamp(y) : 50 };
  };

  const mime = (path) => {
    const ext = String(path).split('.').pop().toLowerCase();
    return { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', avif: 'image/avif', gif: 'image/gif' }[ext] ?? 'image/webp';
  };

  /** Turns the photo's saved path into something an <img> can show. */
  const usePhotoUrl = (getAsset, path) => {
    const [src, setSrc] = useState(null);
    useEffect(() => {
      let cancelled = false;
      let objectUrl;
      setSrc(null);
      const asset = path && typeof getAsset === 'function' ? getAsset(path) : null;
      if (!asset) return undefined;
      const loadable = (u) => typeof u === 'string' && /^(blob:|data:|https?:)/.test(u);
      const attempt = async (tries) => {
        if (cancelled) return;
        if (asset.fileObj instanceof Blob) {
          objectUrl = URL.createObjectURL(asset.fileObj);
          setSrc(objectUrl);
        } else if (loadable(asset.url)) {
          setSrc(asset.url);
        } else if (tries < 20) {
          setTimeout(() => attempt(tries + 1), 250); // the editor fetches photos in the background
        } else {
          try {
            const base64 = await asset.toBase64();
            if (!cancelled) setSrc(`data:${mime(path)};base64,${base64}`);
          } catch {
            /* leave the message below */
          }
        }
      };
      attempt(0);
      return () => {
        cancelled = true;
        if (objectUrl) URL.revokeObjectURL(objectUrl);
      };
    }, [path]);
    return src;
  };

  const ui = {
    wrap: { display: 'grid', gap: '12px', maxWidth: '640px' },
    // The stage is sized from the photo's own shape (at most 340 px tall), so it matches the photo exactly.
    stage: { position: 'relative', display: 'block', cursor: 'crosshair', touchAction: 'none', borderRadius: '8px', outlineOffset: '3px' },
    photo: { display: 'block', width: '100%', height: 'auto', borderRadius: '8px', userSelect: 'none', pointerEvents: 'none' },
    dot: { position: 'absolute', width: '28px', height: '28px', marginLeft: '-14px', marginTop: '-14px', border: '3px solid #fff', borderRadius: '50%', background: 'rgb(8 61 66 / 0.45)', boxShadow: '0 0 0 2px #083D42, 0 2px 8px rgb(0 0 0 / 0.4)', pointerEvents: 'none' },
    row: { display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' },
    button: { padding: '4px 12px', border: '1px solid #b8c4c4', borderRadius: '999px', background: '#fff', font: 'inherit', fontSize: '13px', cursor: 'pointer' },
    previews: { display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'flex-end' },
    shape: { display: 'grid', gap: '4px', justifyItems: 'start', fontSize: '12px', color: '#4a5554' },
    note: { margin: 0, fontSize: '13px', color: '#4a5554' },
  };

  const FocusControl = ({ value, onChange, field, entry, getAsset, forID }) => {
    const imageField = opt(field, 'image_field') || 'image';
    const fallback = opt(field, 'default_focus') || '50% 50%';
    const shapes = opt(field, 'shapes') || [{ label: 'Preview', ratio: '4 / 3' }];
    const path = entry?.getIn?.(['data', ...String(imageField).split('.')]);
    const src = usePhotoUrl(getAsset, path);
    const { x, y } = parse(value, fallback);
    const [dragging, setDragging] = useState(false);
    const [ratio, setRatio] = useState(null);

    const set = (nx, ny) => onChange(`${clamp(nx)}% ${clamp(ny)}%`);
    const fromPointer = (event) => {
      const box = event.currentTarget.getBoundingClientRect();
      set(((event.clientX - box.left) / box.width) * 100, ((event.clientY - box.top) / box.height) * 100);
    };
    const onKeyDown = (event) => {
      const step = event.shiftKey ? 10 : 2;
      const moves = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
      const move = moves[event.key];
      if (!move) return;
      event.preventDefault();
      set(x + move[0], y + move[1]);
    };

    if (!path) return h('p', { style: ui.note }, 'Add the photo first, then choose its focus here.');
    if (!src) return h('p', { style: ui.note }, 'Loading the photo…');

    const position = `${x}% ${y}%`;
    return h(
      'div',
      { style: ui.wrap },
      h(
        'div',
        {
          id: forID,
          role: 'slider',
          tabIndex: 0,
          'aria-label': 'Photo focus point. Click the part of the photo to keep in view, or use the arrow keys.',
          'aria-valuetext': `${x}% from the left, ${y}% from the top`,
          style: { ...ui.stage, width: ratio ? `min(100%, ${Math.round(340 * ratio)}px)` : '240px' },
          onPointerDown: (event) => {
            event.currentTarget.setPointerCapture?.(event.pointerId);
            setDragging(true);
            fromPointer(event);
          },
          onPointerMove: (event) => dragging && fromPointer(event),
          onPointerUp: () => setDragging(false),
          onKeyDown,
        },
        h('img', {
          src,
          alt: '',
          style: ui.photo,
          draggable: false,
          onLoad: (event) => setRatio(event.currentTarget.naturalWidth / event.currentTarget.naturalHeight || 1),
        }),
        h('span', { style: { ...ui.dot, left: `${x}%`, top: `${y}%` } }),
      ),
      h(
        'div',
        { style: ui.row },
        h('span', { style: ui.note }, 'Quick picks:'),
        h('button', { type: 'button', style: ui.button, onClick: () => set(x, 0) }, 'Top'),
        h('button', { type: 'button', style: ui.button, onClick: () => set(x, 50) }, 'Middle'),
        h('button', { type: 'button', style: ui.button, onClick: () => set(x, 100) }, 'Bottom'),
        h('button', { type: 'button', style: ui.button, onClick: () => onChange('') }, 'Reset'),
      ),
      h('p', { style: ui.note }, 'How it will look on the site:'),
      h(
        'div',
        { style: ui.previews },
        shapes.map((shape) =>
          h(
            'div',
            { key: shape.label, style: ui.shape },
            h('img', {
              src,
              alt: '',
              style: {
                display: 'block',
                height: shape.round ? '64px' : '120px',
                aspectRatio: shape.ratio,
                objectFit: 'cover',
                objectPosition: position,
                borderRadius: shape.round ? '50%' : '8px',
                background: '#eef2f2',
              },
            }),
            h('span', null, shape.label),
          ),
        ),
      ),
    );
  };

  const FocusPreview = ({ value }) => h('span', null, value || 'Default');

  CMS.registerFieldType({ name: 'focus', controlComponent: FocusControl, previewComponent: FocusPreview });
})();
