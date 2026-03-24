var vc = Object.defineProperty;
var mc = (e, t, r) => t in e ? vc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var ge = (e, t, r) => mc(e, typeof t != "symbol" ? t + "" : t, r);
var kc = Object.defineProperty, gi = (e) => {
  throw TypeError(e);
}, Sc = (e, t, r) => t in e ? kc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Ve = (e, t, r) => Sc(e, typeof t != "symbol" ? t + "" : t, r), wi = (e, t, r) => t.has(e) || gi("Cannot " + r), D = (e, t, r) => (wi(e, t, "read from private field"), r ? r.call(e) : t.get(e)), re = (e, t, r) => t.has(e) ? gi("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), Re = (e, t, r, n) => (wi(e, t, "write to private field"), t.set(e, r), r);
function Ma(e) {
  const t = { ...e };
  return Object.setPrototypeOf(t, Object.getPrototypeOf(e)), t;
}
function st(e, t, r) {
  if (e === void 0 ? t === void 0 ? (e = 0, t = 10) : e = t - 10 : t === void 0 && (t = e + 10), e > t) {
    const s = e;
    e = t, t = s;
  }
  const n = [], a = 1 / (r + 1);
  for (let s = 0; s < r; s++) {
    const i = e + (t - e) * (s + 0.75 + Math.random() * 0.5) * a;
    n.push(i);
  }
  return n;
}
function Ra(e) {
  return e instanceof Uint8Array || e instanceof Uint16Array || e instanceof Uint32Array || e instanceof Int8Array || e instanceof Int16Array || e instanceof Int32Array || e instanceof Float32Array || e instanceof Float64Array;
}
function Ac() {
  return typeof process < "u";
}
class yi {
}
class Kt extends yi {
  constructor(t) {
    super(), this.id = t;
  }
}
class Do extends yi {
  constructor(t) {
    super(), this.data = t;
  }
}
var ee = /* @__PURE__ */ ((e) => (e[e.Update = 0] = "Update", e))(ee || {}), de = /* @__PURE__ */ ((e) => (e[e.Add = 1] = "Add", e[e.Delete = 2] = "Delete", e[e.Unlink = 3] = "Unlink", e))(de || {}), Ie = /* @__PURE__ */ ((e) => (e[e.Add = 4] = "Add", e[e.Delete = 5] = "Delete", e[e.Move = 6] = "Move", e))(Ie || {}), Pe = /* @__PURE__ */ ((e) => (e[e.Add = 7] = "Add", e[e.Delete = 8] = "Delete", e[e.Move = 9] = "Move", e))(Pe || {});
let ye = class xn {
  // @ts-expect-error - this is a hack to make the type system happy
  modifyById(t, r) {
    const n = this;
    if (n[t] === void 0)
      throw new Error("not expected");
    {
      const a = { ...n, [t]: r };
      return Object.setPrototypeOf(a, xn.prototype), a;
    }
  }
  // @ts-expect-error - this is a hack to make the type system happy
  add(t, r) {
    return this.runOp({ type: de.Add, id: t, data: r })?.data ?? this;
  }
  // @ts-expect-error - this is a hack to make the type system happy
  runOp(t) {
    const r = this;
    if (t.type === de.Add) {
      const n = r[t.id];
      let a;
      n === void 0 ? a = { type: de.Delete, id: t.id } : a = { type: de.Add, id: t.id, data: n };
      const { id: s, data: i } = t, l = { ...r, [s]: i };
      return Object.setPrototypeOf(l, xn.prototype), {
        data: l,
        actual: t,
        reverse: a
      };
    } else if (t.type === de.Delete) {
      const { id: n } = t, a = r[n];
      if (a === void 0)
        return null;
      {
        const s = { ...r };
        return Object.setPrototypeOf(s, xn.prototype), delete s[n], {
          data: s,
          actual: t,
          reverse: { type: de.Add, id: n, data: a }
        };
      }
    }
    return null;
  }
};
function ho(e) {
  if (e.deepFreeze !== void 0) {
    e.deepFreeze(e);
    return;
  }
  const t = Object.getOwnPropertyNames(e);
  for (const r of t) {
    const n = e[r];
    n && typeof n == "object" && ho(n);
  }
  return Object.freeze(e);
}
function Po(e, t) {
  let r = 0;
  for (; r < e.length && r < t.length;) {
    if (e[r] < t[r])
      return -1;
    if (e[r] > t[r])
      return 1;
    r += 1;
  }
  return r !== t.length ? -1 : r !== e.length ? 1 : 0;
}
class vi extends Error {
}
function mi(e, t) {
  for (const r of e)
    t(r.id, r.data) !== !0 && mi(r.children, t);
}
function ki(e, t) {
  if (t(e.id, e.data) !== !0)
    for (const r of e.children)
      ki(r, t);
}
let Be = class Ha extends Array {
  constructor(...t) {
    super(...t), Ve(this, "partialObjectCaches"), Ve(this, "objCaches"), Ve(this, "parentCaches"), Object.setPrototypeOf(this, Ha.prototype);
  }
  deepFreeze() {
    let t = 0;
    for (; t < this.length;)
      ho(this[t]), t++;
  }
  fillCaches0(t, r) {
    this.objCaches.set(t.id, t), this.parentCaches.set(t.id, r);
    for (const n of t.children)
      this.fillCaches0(n, t.id);
  }
  fillCaches() {
    if (this.objCaches === void 0) {
      this.objCaches = /* @__PURE__ */ new Map(), this.parentCaches = /* @__PURE__ */ new Map();
      for (const t of this)
        this.fillCaches0(t, null);
    }
  }
  randomId() {
    this.fillCaches();
    const t = Array.from(this.objCaches.keys());
    if (t.length !== 0)
      return t[Math.max(0, Math.floor(Math.random() * t.length) - 1)];
  }
  nonExistOrDescendantOf(t, r) {
    if (!this.has(t))
      return !0;
    for (; t;) {
      const n = this.parent(t);
      if (n === r) return !0;
      t = n;
    }
    return !1;
  }
  rootAcestor(t) {
    for (; t;) {
      const r = this.parent(t);
      if (r)
        t = r;
      else
        return t;
    }
    return t;
  }
  isDescendantOf(t, r) {
    for (; t;) {
      const n = this.parent(t);
      if (n === r) return !0;
      t = n;
    }
    return !1;
  }
  data(t) {
    return this.get(t)?.data;
  }
  has(t) {
    return this.childrenOf(t) !== void 0;
  }
  partialCache(t) {
    this.partialObjectCaches === void 0 && (this.partialObjectCaches = /* @__PURE__ */ new Map());
    const r = this.get(t);
    r !== void 0 && this.partialObjectCaches.set(t, r);
  }
  get(t) {
    if (this.partialObjectCaches !== void 0) {
      const r = this.partialObjectCaches.get(t);
      if (r !== void 0)
        return r;
    }
    return this.fillCaches(), this.objCaches.get(t);
  }
  childrenOf(t) {
    return t === null ? this : this.get(t)?.children;
  }
  traverseFrom(t, r) {
    if (t === null)
      this.traverse(r);
    else {
      const n = this.get(t);
      n && ki(n, r);
    }
  }
  traverse(t) {
    mi(this, t);
  }
  totalSize() {
    return this.fillCaches(), this.objCaches.size;
  }
  parent(t) {
    return this.fillCaches(), this.parentCaches.get(t);
  }
  childrenArray(t) {
    return t === null ? this : this.get(t).children;
  }
  modifyById(t, r) {
    if (this.get(t) === void 0)
      throw new Error("not expected");
    {
      const n = this.parent(t);
      let a = this.childrenArray(n);
      const s = a.findIndex((f) => f.id === t);
      if (s < 0) throw new Error("not expected");
      const i = a[s];
      a = [...a], a[s] = { ...i, data: r };
      const l = /* @__PURE__ */ new Map();
      return l.set(t, a[s]), this.modifyArrayBy(n, a, l);
    }
  }
  modifyArrayBy(t, r, n = void 0) {
    let a = t, s = r;
    for (; a !== null;) {
      const l = s, f = a;
      if (a = this.parent(a), a === void 0) throw new Error();
      s = this.childrenArray(a);
      const p = s.findIndex((g) => g.id === f);
      if (p < 0) throw new Error();
      s = [...s], s[p] = { ...s[p], children: l }, n && n.set(f, s[p]);
    }
    Object.setPrototypeOf(s, Ha.prototype);
    const i = s;
    if (n && this.objCaches !== void 0 && this.parentCaches !== void 0) {
      i.objCaches = this.objCaches;
      for (const [l, f] of n)
        i.objCaches.set(l, f);
      i.parentCaches = this.parentCaches, this.objCaches = void 0, this.parentCaches = void 0;
    } else
      i.fillCaches();
    return i;
  }
  runOp(t) {
    switch (t.type) {
      case Pe.Add:
        return this.addOp(t);
      case Pe.Delete:
        return this.deleteOp(t);
      case Pe.Move:
        return this.moveOp(t);
    }
    return null;
  }
  checkDuplicatedIdRec({ id: t, children: r }) {
    if (this.get(t) !== void 0)
      return !0;
    for (const n of r)
      if (this.checkDuplicatedIdRec(n))
        return !0;
    return !1;
  }
  addOp(t) {
    const { parent: r, fi: n, id: a, data: s, children: i } = t;
    if (r !== null && this.get(r) === void 0 || this.checkDuplicatedIdRec(t))
      return null;
    {
      const l = r;
      let f = this.childrenArray(l);
      const p = { fi: n, id: a, data: s, children: i };
      return f = [...f, p], f.sort((g, y) => g.fi - y.fi), t.localIndex = f.indexOf(p), {
        data: this.modifyArrayBy(l, f),
        actual: t,
        reverse: { type: Pe.Delete, id: a }
      };
    }
  }
  deleteOp(t) {
    const { id: r } = t;
    if (this.get(r) === null)
      return null;
    {
      const n = this.parent(r);
      if (n === void 0) return null;
      let a = this.childrenArray(n);
      const s = a.findIndex((l) => l.id === r);
      t.localIndex = s, a = [...a];
      const i = a.splice(s, 1)[0];
      return {
        data: this.modifyArrayBy(n, a),
        actual: t,
        reverse: { type: Pe.Add, ...i, parent: n }
      };
    }
  }
  moveOp(t) {
    const { parent: r, fi: n, id: a } = t;
    if (r !== null && this.get(r) === void 0)
      return this.deleteOp({ type: Pe.Delete, id: a });
    if (r !== null) {
      let S = r;
      for (; S !== null;) {
        if (S === void 0) throw new Error();
        if (S === a)
          throw new vi("cyclic tree");
        S = this.parent(S);
      }
    }
    let s = this.parent(a);
    if (s === void 0)
      return null;
    const i = s;
    let l = this.childrenArray(s);
    const f = l.findIndex((S) => S.id === a);
    l = [...l];
    let p = l.splice(f, 1)[0], g = this.modifyArrayBy(s, l);
    s = r, l = g.childrenArray(s);
    const y = p.fi;
    return p = { ...p, fi: n }, l = [...l, p], l.sort((S, U) => S.fi - U.fi), t.localIndex = l.indexOf(p), g = g.modifyArrayBy(s, l), {
      data: g,
      actual: t,
      reverse: { type: Pe.Move, parent: i, fi: y, id: a }
    };
  }
  /**
   * previous id of a given object, if null or not find, return the last object id if not empty
   */
  previous(t, r) {
    if (r === null) {
      const a = this.childrenArray(t);
      return a.length === 0 ? null : a[a.length - 1].id;
    }
    let n = null;
    for (const a of this.childrenArray(t)) {
      if (a.id === r)
        return n;
      n = a.id;
    }
    return null;
  }
  traverseSortNext(t) {
    const r = this.parent(t);
    if (r !== void 0) {
      const n = this.childrenArray(r), a = n.findIndex((s) => s.id === t) + 1;
      if (a < n.length) return n[a].id;
      if (r) return this.traverseSortNext(r);
    }
  }
  /**
   * return next id by preorder traversal
   */
  sortNext(t) {
    const r = this.childrenArray(t);
    return r.length > 0 ? r[0].id : this.traverseSortNext(t);
  }
  traverseSortPrevious(t) {
    const r = this.childrenArray(t);
    return r.length > 0 ? this.traverseSortPrevious(r[r.length - 1].id) : t;
  }
  /**
   * return previous id by preorder traversal
   */
  sortPrevious(t) {
    const r = this.parent(t);
    if (r !== void 0) {
      const n = this.childrenArray(r), a = n.findIndex((s) => s.id === t) - 1;
      return a >= 0 ? this.traverseSortPrevious(n[a].id) : r;
    }
  }
  /**
   * get objects by the order they appear visually in object tree
   * if object doesn't exist, it is omitted
   */
  getAllSorted(t) {
    const r = [];
    for (const n of t) {
      const a = this.getWithSortKey(n.id);
      a !== void 0 && r.push({ ...n, ...a });
    }
    r.sort((n, a) => Po(n.sortKey, a.sortKey));
    for (const n of r)
      delete n.sortKey;
    return r;
  }
  getAllIdSorted(t) {
    const r = [];
    for (const n of t) {
      const a = this.getWithSortKey(n);
      a !== void 0 && r.push(a);
    }
    r.sort((n, a) => Po(n.sortKey, a.sortKey));
    for (const n of r)
      delete n.sortKey;
    return r.map((n) => n.id);
  }
  /**
   * return the item and the indexes to get to the item from root to the item
   */
  getWithSortKey(t) {
    let r = t;
    const n = [];
    let a = this.get(r);
    const s = a;
    if (a !== void 0) {
      for (; r;)
        n.splice(0, 0, a.fi), r = this.parent(r), r !== null && (a = this.get(r));
      return { ...s, sortKey: n };
    }
  }
  insertBeforeHelper(t, r, n) {
    return this.insertAfterHelper(t, this.previous(t, r), n);
  }
  insertAfterHelper(t, r, n) {
    const a = this.childrenArray(t);
    if (r === null) {
      if (a.length === 0)
        return st(0, n, n);
      {
        const s = a[0].fi;
        return st(s - n, s, n);
      }
    } else {
      const s = this.get(r);
      if (s === void 0 || this.parent(r) !== t)
        throw new Error("illegal args");
      const i = a.find((l) => l.fi > s.fi);
      if (i === void 0) {
        const l = a[a.length - 1].fi;
        return st(l, l + n, n);
      } else
        return st(s.fi, i.fi, n);
    }
  }
};
var Gt;
((e) => {
  e.PERSERVE_PROTOTYPE = null;
  function t(a) {
    e.PERSERVE_PROTOTYPE = a;
  }
  e.setPreservePrototype = t;
  function r(a, s) {
    return Object.getPrototypeOf(a) === e.PERSERVE_PROTOTYPE && Object.setPrototypeOf(s, e.PERSERVE_PROTOTYPE), s;
  }
  e.tryPreservePrototype = r;
  function n(a, s) {
    if (s.type !== ee.Update)
      return null;
    if (Array.isArray(a)) {
      const i = s.props, l = {}, f = [...a];
      let p = !1;
      if (i)
        for (const g of Object.keys(i)) {
          const y = parseInt(g);
          if (isNaN(y))
            throw new Error("wrong index");
          l[g] = f[y], f[y] = i[g], p = !0;
        }
      return p ? {
        data: f,
        actual: s,
        reverse: {
          type: ee.Update,
          props: l
        }
      } : null;
    } else {
      const i = s.props, l = {}, f = { ...a };
      let p = !1;
      if (i)
        for (const g of Object.keys(i)) {
          l[g] = f[g];
          const y = i[g];
          y === void 0 ? delete f[g] : f[g] = y, p = !0;
        }
      return p ? {
        data: e.tryPreservePrototype(a, f),
        actual: s,
        reverse: {
          type: ee.Update,
          props: l
        }
      } : null;
    }
  }
  e.runOp = n;
})(Gt || (Gt = {}));
let Ae = class Wa extends Array {
  constructor(...t) {
    super(...t), Ve(this, "objCaches"), Object.setPrototypeOf(this, Wa.prototype);
  }
  deepFreeze() {
    let t = 0;
    for (; t < this.length;)
      ho(this[t]), t++;
  }
  fillCaches0(t) {
    this.objCaches.set(t.id, t);
  }
  fillCaches() {
    if (this.objCaches === void 0) {
      this.objCaches = /* @__PURE__ */ new Map(), Object.getOwnPropertyDescriptor(this, "objCaches").enumerable = !1;
      for (const t of this)
        this.fillCaches0(t);
    }
  }
  randomId() {
    this.fillCaches();
    const t = Array.from(this.objCaches.keys());
    if (t.length !== 0)
      return t[Math.max(0, Math.floor(Math.random() * t.length) - 1)];
  }
  data(t) {
    return this.get(t)?.data;
  }
  get(t) {
    return this.fillCaches(), this.objCaches.get(t);
  }
  modifyById(t, r) {
    if (this.get(t) === void 0)
      throw new Error("not expected");
    {
      let n = this;
      const a = n.findIndex((i) => i.id === t);
      if (a < 0) throw new Error("not expected");
      const s = n[a];
      return n = [...n], n[a] = { ...s, data: r }, this.modifyArrayBy(n);
    }
  }
  modifyArrayBy(t) {
    Object.setPrototypeOf(t, Wa.prototype);
    const r = t;
    return Ac() || r.fillCaches(), r;
  }
  runOp(t) {
    switch (t.type) {
      case Ie.Add:
        return this.addOp(t);
      case Ie.Delete:
        return this.deleteOp(t);
      case Ie.Move:
        return this.moveOp(t);
    }
    return null;
  }
  addOp(t) {
    const { fi: r, id: n, data: a } = t;
    let s = this;
    const i = { fi: r, id: n, data: a };
    return s = [...s, i], s.sort((l, f) => l.fi - f.fi), t.localIndex = s.indexOf(i), {
      data: this.modifyArrayBy(s),
      actual: t,
      reverse: { type: Ie.Delete, id: n }
    };
  }
  deleteOp(t) {
    const { id: r } = t;
    let n = this;
    const a = n.findIndex((i) => i.id === r);
    if (a === -1) return null;
    t.localIndex = a, n = [...n];
    const s = n.splice(a, 1)[0];
    return {
      data: this.modifyArrayBy(n),
      actual: t,
      reverse: { type: Ie.Add, ...s }
    };
  }
  moveOp(t) {
    const { fi: r, id: n } = t;
    let a = this;
    a = [...a];
    const s = a.findIndex((f) => f.id === n);
    if (s === -1)
      return null;
    const i = a[s].fi, l = { ...a[s], fi: r };
    return a[s] = l, a.sort((f, p) => f.fi - p.fi), t.localIndex = a.indexOf(l), {
      data: this.modifyArrayBy(a),
      actual: t,
      reverse: { type: Ie.Move, fi: i, id: n }
    };
  }
  /**
   * previous id of a given object, if null or not find, return the last object id if not empty
   */
  previous(t) {
    if (t === null)
      return this.length === 0 ? null : this[this.length - 1].id;
    let r = null;
    for (const n of this) {
      if (n.id === t)
        return r;
      r = n.id;
    }
    return null;
  }
  insertBeforeHelper(t, r) {
    return this.insertAfterHelper(this.previous(t), r);
  }
  insertAfterHelper(t, r) {
    const n = this;
    if (t === null) {
      if (n.length === 0)
        return st(0, r, r);
      {
        const a = n[0].fi;
        return st(a - r, a, r);
      }
    } else {
      const a = this.get(t);
      if (a === void 0)
        throw new Error("illegal args");
      const s = n.find((i) => i.fi > a.fi);
      if (s === void 0) {
        const i = n[n.length - 1].fi;
        return st(i, i + r, r);
      } else
        return st(a.fi, s.fi, r);
    }
  }
};
function xc(e, t) {
  const r = { cur: [], result: [], len: 0 };
  return e = Ur(e, t, r) ?? e, [e, r.result];
}
function Ln(e, t) {
  return e === null ? null : (e.cur[e.len] = t, e.len += 1, e);
}
function zn(e) {
  e && (e.len -= 1);
}
function Oc(e) {
  if (e === null)
    return null;
  e.result.push(e.cur.slice(0, e.len));
}
function Si(e, t, r) {
  let n = !1;
  const a = e.map((s) => {
    let i = s.id;
    const l = t[i];
    if (l !== void 0 && typeof l == "string" && (n = !0, i = l, r !== null))
      throw new Error("not supported");
    let f = Ur(s.data, t, Ln(r, i));
    zn(r), n = n || f !== void 0, f === void 0 && (f = s.data);
    let p = Si(s.children, t, r);
    return p !== void 0 ? n = !0 : p = s.children, { ...s, id: i, data: f, children: p };
  });
  if (n)
    return a;
}
function Ec(e, t, r) {
  let n = !1;
  const a = e.map((s) => {
    let i = s.id;
    const l = t[i];
    if (l !== void 0 && typeof l == "string" && (n = !0, i = l, r !== null))
      throw new Error("not supported");
    let f = Ur(s.data, t, Ln(r, i));
    return zn(r), n = n || f !== void 0, f === void 0 && (f = s.data), { ...s, id: i, data: f };
  });
  if (n)
    return Object.setPrototypeOf(a, Object.getPrototypeOf(e)), a;
}
function Ur(e, t, r) {
  if (e instanceof Be) {
    const n = Si(e, t, r);
    return n !== void 0 && Object.setPrototypeOf(n, Object.getPrototypeOf(e)), n;
  } else {
    if (e instanceof Ae)
      return Ec(e, t, r);
    if (Array.isArray(e)) {
      let n = !1;
      const a = e.map((s, i) => {
        let l = Ur(s, t, Ln(r, i));
        return zn(r), n = n || l !== void 0, l === void 0 && (l = s), l;
      });
      return n ? (Object.setPrototypeOf(a, Object.getPrototypeOf(e)), a) : void 0;
    } else if (e && typeof e == "object" && !Ra(e)) {
      const n = {};
      let a = !1;
      for (let [s, i] of Object.entries(e))
        if (s !== "name" && s !== "variableId") {
          const l = t[s];
          if (typeof l == "string") {
            if (r !== null)
              throw new Error("not supported");
            a = !0, s = l;
          }
          let f = Ur(i, t, Ln(r, s));
          zn(r), a = a || f !== void 0, f === void 0 && (f = i), n[s] = f;
        } else
          n[s] = i;
      return a ? (Object.setPrototypeOf(n, Object.getPrototypeOf(e)), n) : void 0;
    } else if (typeof e == "string") {
      const n = t[e];
      return n !== void 0 && Oc(r), n;
    } else
      return;
  }
}
function qt(e) {
  return e && typeof e == "object" && e instanceof Ce;
}
class Ce {
  unusedFunOverridesTable(t) {
  }
  runOp(t) {
    const r = [];
    let n = this, a = 0;
    const s = {};
    for (; a < t.path.length;) {
      if (r.push(n), n = n === void 0 ? void 0 : n[t.path[a]], n !== void 0 && !qt(n))
        return null;
      a += 1;
    }
    n = n ? Ma(n) : new Ce();
    for (const [f, p] of Object.entries(t.props)) {
      const g = n[f];
      s[f] = g, p === void 0 ? delete n[f] : n[f] = p;
    }
    for (; a > 0;) {
      if (Object.keys(n).length === 0) {
        const f = r[a - 1];
        f && (n = Ma(f), delete n[t.path[a - 1]]);
      } else {
        const f = r[a - 1];
        if (f) {
          const p = Ma(f);
          p[t.path[a - 1]] = n, n = p;
        } else {
          const p = new Ce();
          p[t.path[a - 1]] = n, n = p;
        }
      }
      a -= 1;
    }
    const i = Object.setPrototypeOf(n, Ce.prototype), l = { ...t, props: s };
    return { data: i, actual: t, reverse: l };
  }
}
var Ka;
((e) => {
  function t(a, s) {
    return jr(a, s) ?? a;
  }
  e.apply = t;
  function r(a, s) {
    return _o(a, s);
  }
  e.merge = r;
  function n(a, s) {
    let i = 0;
    const l = s.path;
    let f = a;
    for (; i < l.length && f !== void 0;) {
      if (f = ie.zoomOnce(f, l[i]), f === void 0)
        return s;
      if (!qt(f))
        return;
      i += 1;
    }
    if (f === void 0)
      return s;
    if (qt(f))
      if (s.type === ee.Update) {
        const p = { ...s.props };
        for (const g of Object.keys(f))
          delete p[g];
        return { ...s, props: p };
      } else if (s.type === de.Add || s.type === Ie.Add || s.type === Pe.Add) {
        const p = po([s], f);
        return p ? (console.log(p), p) : s;
      } else
        return s;
  }
  e.filterOp = n;
})(Ka || (Ka = {}));
function po(e, t) {
  if (t === void 0)
    return;
  let r = !1;
  const n = e.map((a) => {
    const s = a.id;
    let i = jr(a.data, t[s]);
    if (r = r || i !== void 0, i === void 0 && (i = a.data), a.children) {
      let l = po(a.children, t);
      return l !== void 0 ? r = !0 : l = a.children, { ...a, id: s, data: i, children: l };
    } else
      return { ...a, id: s, data: i };
  });
  if (r)
    return n;
}
function Dc(e, t) {
  if (t === void 0)
    return;
  let r = !1;
  const n = e.map((a) => {
    const s = a.id;
    let i = jr(a.data, t[s]);
    return r = r || i !== void 0, i === void 0 && (i = a.data), { ...a, id: s, data: i };
  });
  if (r)
    return Object.setPrototypeOf(n, Object.getPrototypeOf(e)), n;
}
function jr(e, t) {
  if (!qt(t))
    return t;
  if (e instanceof Be) {
    const r = po(e, t);
    return r !== void 0 && Object.setPrototypeOf(r, Object.getPrototypeOf(e)), r;
  } else {
    if (e instanceof Ae)
      return Dc(e, t);
    if (Array.isArray(e)) {
      let r = !1;
      const n = e.map((a, s) => {
        let i = jr(a, t[s]);
        return r = r || i !== void 0, i === void 0 && (i = a), i;
      });
      return r ? (Object.setPrototypeOf(n, Object.getPrototypeOf(e)), n) : void 0;
    } else {
      if (e instanceof Ce)
        return _o(e, t);
      if (e && typeof e == "object") {
        const r = {};
        let n = !1;
        for (const [a, s] of Object.entries(e)) {
          let i = jr(s, t[a]);
          n = n || i !== void 0, i === void 0 && (i = s), r[a] = i;
        }
        return n ? (Object.setPrototypeOf(r, Object.getPrototypeOf(e)), r) : void 0;
      }
    }
  }
}
function _o(e, t) {
  if (e === void 0)
    return t;
  if (t === void 0)
    return e;
  if (!qt(t))
    return t;
  if (!qt(e))
    return Ka.apply(e, t);
  const r = /* @__PURE__ */ new Set();
  for (const a of Object.keys(e))
    r.add(a);
  for (const a of Object.keys(t))
    r.add(a);
  const n = new Ce();
  for (const a of r) {
    const s = _o(
      e === void 0 ? void 0 : e[a],
      t === void 0 ? void 0 : t[a]
    );
    n[a] = s;
  }
  return n;
}
var Io;
((e) => {
  function t(r, n) {
    const a = ie.zoom(n, r.path);
    if (typeof a == "object") {
      const s = {};
      for (const i of Object.keys(r.props))
        s[i] = a[i];
      return { ...r, props: s };
    } else
      return { ...r, props: {} };
  }
  e.replaceProps = t;
})(Io || (Io = {}));
var vt;
((e) => {
  function t(f, p) {
    return {
      ...f,
      path: f.path.slice(p)
    };
  }
  e.drop = t;
  function r(f, p) {
    return n(f, p)?.data ?? f;
  }
  e.applySimple = r;
  function n(f, p) {
    const g = p.path, y = [];
    for (; ;) {
      let S;
      if (f instanceof Ce && p.type === ee.Update && (S = f.runOp({
        ...p,
        path: g.slice(y.length)
      }), S === null && (S = void 0)), S === void 0 && y.length === g.length && (f instanceof Be || f instanceof Ae || f instanceof ye ? S = f.runOp(p) : S = Gt.runOp(f, p)), S !== void 0)
        if (S !== null) {
          let P = S.data;
          for (let B = y.length - 1; B >= 0; B--) {
            let R = g[B];
            const N = y[B];
            if (N instanceof Be) {
              if (typeof R == "number")
                throw new Error("illegal arg");
              P = N.modifyById(R, P);
            } else if (N instanceof Ae) {
              if (typeof R == "number")
                throw new Error("illegal arg");
              P = N.modifyById(R, P);
            } else if (N instanceof ye) {
              if (typeof R == "number")
                throw new Error("illegal arg");
              P = N.modifyById(R, P);
            } else if (N instanceof Ce) {
              const oe = { ...N, [R]: P };
              P = Object.setPrototypeOf(oe, Ce.prototype);
            } else if (typeof N == "object")
              if (Array.isArray(N)) {
                if (typeof R == "string" && (R = parseInt(R), isNaN(R)))
                  throw new Error("Invalid path");
                const oe = P;
                P = [...N], P[R] = oe;
              } else
                P = Gt.tryPreservePrototype(N, { ...N, [R]: P });
            else
              return null;
          }
          return {
            data: P,
            actual: { ...S.actual, path: g },
            reverse: { ...S.reverse, path: g }
          };
        } else
          return null;
      const U = g[y.length];
      let j;
      if (f instanceof Be) {
        if (typeof U == "number") throw new Error("");
        j = f.get(U)?.data;
      } else if (f instanceof Ae) {
        if (typeof U == "number") throw new Error("");
        j = f.get(U)?.data;
      } else f !== null && (j = f[U]);
      if (j !== void 0)
        y.push(f), f = j;
      else
        return null;
    }
  }
  e.apply = n;
  function a(f, p) {
    for (let g = 0; g < f.length && g < p.length; g++)
      if (f[g] !== p[g])
        return !0;
    return !1;
  }
  e.pathDisjoint = a;
  function s(f, p) {
    if (f.length !== p.length) return !1;
    for (let g = 0; g < f.length; g++)
      if (f[g] !== p[g])
        return !1;
    return !0;
  }
  e.pathEq = s;
  function i(f, p) {
    return a(f.path, p.path);
  }
  e.commutative = i;
  function l(f, p) {
    return f.type === ee.Update && p.type === ee.Update && s(f.path, p.path) ? Object.keys(f.props).every((g) => p.props[g] !== void 0) : !1;
  }
  e.subsumed = l;
})(vt || (vt = {}));
var Fn;
((e) => {
  function t() {
    return [];
  }
  e.empty = t;
  function r(p, g) {
    const y = [];
    for (const S of p) {
      const [U, ...j] = S.path;
      U === g && y.push({ ...S, path: j });
    }
    return y;
  }
  e.removePrefix = r;
  function n(p, g) {
    return p.map((y) => ({ ...y, path: [g, ...y.path] }));
  }
  e.addPrefix = n;
  function a(p, g) {
    return [...p, ...g];
  }
  e.concat = a;
  function s(p, g) {
    return [...p.filter((y) => !g.some((S) => vt.subsumed(y, S))), ...g];
  }
  e.compress = s;
  function i(p, g) {
    return p.every((y) => g.every((S) => vt.commutative(y, S)));
  }
  e.commutative = i;
  function l(p, g) {
    for (const y of g) {
      const S = f(p, y);
      S !== null && (p = S.data);
    }
    return p;
  }
  e.applyAll = l;
  function f(p, g) {
    let y = p;
    const S = [], U = [];
    for (const j of g)
      try {
        if (j.type === de.Unlink || j.type === Ie.Delete && j.path[j.path.length - 1] === "variables") {
          let P, B, R;
          if (j.type === de.Unlink ? (P = ie.zoom(y, [...j.path, j.id]), R = vt.apply(y, { ...j, type: de.Delete })) : (P = ie.zoom(y, [...j.path, j.id, "value"]), R = vt.apply(y, j)), R !== null) {
            y = R.data;
            const [N, oe] = xc(y, {
              [j.id]: P
            });
            y = N;
            for (let Z = 0; Z < oe.length; Z++) {
              const qe = oe[Z];
              let et = qe.pop();
              if (typeof et == "number") {
                const cr = [et];
                for (let be = Z + 1; be < oe.length; be++) {
                  const ze = oe[be], lr = ze[ze.length - 1];
                  if (typeof lr == "number" && ie.equal(qe, ze.slice(0, ze.length - 1)))
                    cr.push(lr), oe.splice(be, 1);
                  else
                    break;
                }
                const bt = ie.zoom(y, qe);
                B = bt.map((be, ze) => cr.includes(ze) ? j.id : be), P = bt, et = qe.pop();
              } else
                B = j.id;
              S.push({
                type: ee.Update,
                path: qe,
                props: { [et]: P }
              }), U.push({
                type: ee.Update,
                path: qe,
                props: { [et]: B }
              });
            }
            U.push(R.reverse), S.push(R.actual);
          }
        } else {
          const P = vt.apply(y, j);
          P !== null && (S.push(P.actual), y = P.data, U.push(P.reverse));
        }
      } catch (P) {
        if (P instanceof vi)
          return null;
        throw P;
      }
    return { data: y, actual: S, reverse: U.reverse() };
  }
  e.apply = f;
})(Fn || (Fn = {}));
const bo = Symbol(), Pc = Symbol(), Ta = Symbol();
class _n {
  reportOp(t, r, n = []) {
    let a = this;
    if (r === null)
      return;
    a._current = r.data;
    const s = n;
    for (; !(a instanceof Tc);) {
      const i = a._path, l = a._current;
      if (i !== "" && s.splice(0, 0, i), a = a._parent, a === null)
        return;
      a.update(i, l);
    }
    a.push(s, t, r.actual, r.reverse);
  }
  deleteChildren(t) {
    if (this._children) {
      const r = this._children[t];
      if (r) {
        const n = r[Ta];
        n && n(), delete this._children[t];
      }
    }
  }
}
class Ic extends _n {
  constructor(t, r, n) {
    super(), this._parent = t, this._path = r, this._current = n;
  }
  update(t, r) {
    if (Array.isArray(this._current)) {
      if (typeof t == "string" && (t = parseInt(t), isNaN(t)))
        throw new Error("Invalid path");
      this._current = [...this._current], this._current[t] = r;
    } else
      this._current = Gt.tryPreservePrototype(this._current, { ...this._current, [t]: r });
  }
  runOp(t) {
    this.reportOp(t, Gt.runOp(this._current, t), t.path);
  }
}
class Cc extends _n {
  constructor(t, r, n) {
    super(), this._parent = t, this._path = r, this._current = n;
  }
  update(t, r) {
    this._current = { ...this._current, [t]: r }, Object.setPrototypeOf(this._current, ye.prototype);
  }
  runOp(t) {
    this.reportOp(t, this._current.runOp(t));
  }
}
const Ai = {
  get(e, t) {
    if (t === Ta)
      return () => {
        e._parent = null;
      };
    if (t === bo)
      return e._current;
    if (t === Pc)
      return e;
    let { _current: r, _children: n } = e;
    if (t === "push" && Array.isArray(r))
      throw new Error("not supported to expand array");
    const a = n === void 0 ? void 0 : n[t];
    if (a !== void 0)
      return a;
    const s = r[t], i = go(e, t, s);
    return i !== s ? (n === void 0 && (n = {}, e._children = n), n[t] = i, i) : s;
  },
  has(e, t) {
    return t in e._current;
  },
  ownKeys(e) {
    return Reflect.ownKeys(e._current);
  },
  defineProperty() {
    throw Error("not supported");
  },
  getPrototypeOf(e) {
    return Object.getPrototypeOf(e._current);
  },
  setPrototypeOf() {
    throw Error("not supported");
  },
  getOwnPropertyDescriptor(e, t) {
    const r = e._current, n = Reflect.getOwnPropertyDescriptor(r, t);
    return n && {
      writable: !0,
      configurable: !0,
      enumerable: n.enumerable,
      value: r[t]
    };
  }
}, $c = {
  ...Ai,
  set(e, t, r) {
    const n = {
      type: ee.Update,
      props: { [t]: wo(r) ?? r }
    };
    return e.deleteChildren(t), e.runOp(n), !0;
  },
  deleteProperty(e, t) {
    const r = { type: ee.Update, props: { [t]: void 0 } };
    return e.deleteChildren(t), e.runOp(r), !0;
  }
}, Rc = {
  ...Ai,
  set(e, t, r) {
    return r === void 0 ? this.deleteProperty(e, t) : (e.deleteChildren(t), e.runOp({ type: de.Add, id: t, data: r })), !0;
  },
  deleteProperty(e, t) {
    return e.runOp({ type: de.Delete, id: t }), !0;
  }
};
class bn extends _n {
  constructor(t, r, n) {
    super(), this._children = {}, this._parent = t, this._path = r, this._current = n, this[Ta] = () => {
      this._parent = null;
    };
  }
  unproxy() {
    return this._current;
  }
  update(t, r) {
    this._current = this._current.modifyById(t, r);
  }
  runOp(t) {
    this.reportOp(t, this._current.runOp(t));
  }
  randomId() {
    return this._current.randomId();
  }
  isDescendantOf(t, r) {
    return this._current.isDescendantOf(t, r);
  }
  childrenOf(t) {
    return this._current.childrenOf(t);
  }
  // traverse(map) {
  // 	return this._current.traverse(map);
  // }
  get(t) {
    return this._current.get(t);
  }
  parent(t) {
    return this._current.parent(t);
  }
  traverse(t) {
    this._current.traverse((r, n) => {
      t(r, this.data(r));
    });
  }
  data(t) {
    let { _current: r, _children: n } = this;
    const a = n === void 0 ? void 0 : n[t];
    if (a !== void 0)
      return a;
    const s = r.get(t)?.data, i = go(this, t, s);
    return i !== s ? (n === void 0 && (n = {}, this._children = n), n[t] = i, i) : s;
  }
  add(t, r, n, a, s) {
    this.runOp({ type: Pe.Add, parent: t, fi: r, id: n, data: a, children: s });
  }
  move(t, r, n) {
    this.runOp({ type: Pe.Move, parent: t, fi: r, id: n });
  }
  insertAfter(t, r, n) {
    const a = this._current.insertAfterHelper(t, r, n.length);
    for (let s = 0; s < n.length; s++) {
      const i = n[s];
      this.add(t, a[s], i.id, i.data, i.children);
    }
  }
  insertBefore(t, r, n) {
    const a = this._current.insertBeforeHelper(t, r, n.length);
    for (let s = 0; s < n.length; s++) {
      const i = n[s];
      this.add(t, a[s], i.id, i.data, i.children);
    }
  }
  moveAfter(t, r, n) {
    const a = this._current.insertAfterHelper(t, r, n.length);
    for (let s = 0; s < n.length; s++) {
      const i = n[s];
      this.move(t, a[s], i);
    }
  }
  moveBefore(t, r, n) {
    const a = this._current.insertBeforeHelper(t, r, n.length);
    for (let s = 0; s < n.length; s++) {
      const i = n[s];
      this.move(t, a[s], i);
    }
  }
  delete(t) {
    this.deleteChildren(t), this.runOp({ type: Pe.Delete, id: t });
  }
  sortNext(t) {
    return this._current.sortNext(t);
  }
  sortPrevious(t) {
    return this._current.sortPrevious(t);
  }
  getAllSorted(t) {
    return this._current.getAllSorted(t);
  }
}
class gn extends _n {
  constructor(t, r, n) {
    super(), this._children = {}, this._parent = t, this._path = r, this._current = n, this[Ta] = () => {
      this._parent = null;
    };
  }
  unproxy() {
    return this._current;
  }
  get length() {
    return this._current.length;
  }
  forEach(t) {
    const r = this.length;
    for (let n = 0; n < r; n++) {
      const a = this._current[n].id, s = this._current[n].fi;
      t(this.data(this._current[n].id), a, s, n);
    }
  }
  find(t) {
    const r = this.length;
    for (let n = 0; n < r; n++) {
      const a = this._current[n].id;
      if (t(this.data(a), a))
        return this.get(a);
    }
  }
  update(t, r) {
    this._current = this._current.modifyById(t, r);
  }
  randomId() {
    return this._current.randomId();
  }
  get(t) {
    return { ...this._current.get(t), data: this.data(t) };
  }
  at(t) {
    const { id: r, fi: n } = this._current.at(t);
    return { id: r, fi: n, data: this.data(r) };
  }
  data(t) {
    let { _current: r, _children: n } = this;
    const a = n === void 0 ? void 0 : n[t];
    if (a !== void 0)
      return a;
    const s = r.get(t)?.data, i = go(this, t, s);
    return i !== s ? (n === void 0 && (n = {}, this._children = n), n[t] = i, i) : s;
  }
  runOp(t) {
    this.reportOp(t, this._current.runOp(t));
  }
  add(t, r, n) {
    this.runOp({ type: Ie.Add, fi: t, id: r, data: n });
  }
  move(t, r) {
    this.runOp({ type: Ie.Move, fi: t, id: r });
  }
  insertAfter(t, r) {
    const n = this._current.insertAfterHelper(t, r.length);
    for (let a = 0; a < r.length; a++) {
      const s = r[a];
      this.add(n[a], s.id, s.data);
    }
  }
  insertBefore(t, r) {
    const n = this._current.insertBeforeHelper(t, r.length);
    for (let a = 0; a < r.length; a++) {
      const s = r[a];
      this.add(n[a], s.id, s.data);
    }
  }
  moveAfter(t, r) {
    const n = this._current.insertAfterHelper(t, r.length);
    for (let a = 0; a < r.length; a++) {
      const s = r[a];
      this.move(n[a], s);
    }
  }
  moveBefore(t, r) {
    const n = this._current.insertBeforeHelper(t, r.length);
    for (let a = 0; a < r.length; a++) {
      const s = r[a];
      this.move(n[a], s);
    }
  }
  delete(t) {
    this.deleteChildren(t), this.runOp({ type: Ie.Delete, id: t });
  }
}
function La(e, t, r) {
  if (e.length > 0) {
    const n = e[e.length - 1];
    if (n.type === ee.Update && t.type === ee.Update && ie.equal(n.path, r)) {
      Object.assign(n.props, t.props);
      return;
    }
  }
  e.push({ ...t, path: r });
}
class Tc extends _n {
  constructor(t) {
    super(), this.ts = [], this.actual = [], this.reverse = [], this._current = t;
  }
  update(t, r) {
    if (t !== "")
      throw new Error("");
    this._current = r;
  }
  push(t, r, n, a) {
    La(this.ts, r, t), La(this.actual, n, t), La(this.reverse, a, t);
  }
  result() {
    return {
      data: this._current,
      ts: this.ts,
      actual: this.actual,
      reverse: this.reverse.reverse()
    };
  }
}
function go(e, t, r) {
  return r instanceof Be ? new bn(e, t, r) : r instanceof Ae ? new gn(e, t, r) : r instanceof ye ? new Proxy(new Cc(e, t, r), Rc) : r !== null && typeof r == "object" ? Ra(r) ? r : new Proxy(new Ic(e, t, r), $c) : r;
}
function wo(e) {
  return e instanceof bn || e instanceof gn ? e._current : e !== null && typeof e == "object" ? e[bo] : e;
}
function wn(e) {
  if (e instanceof bn || e instanceof gn)
    return e._current;
  if (e !== null && typeof e == "object") {
    const t = e[bo];
    return t !== void 0 ? t : e;
  } else
    return e;
}
var ie;
((e) => {
  function t(i, l) {
    if (l.length === i.length) {
      let f = 0;
      for (; f < i.length;) {
        if (i[f] !== l[f]) return !1;
        f += 1;
      }
    } else
      return !1;
    return !0;
  }
  e.equal = t;
  function r(i, l, f) {
    const p = a(f, i);
    if (p !== void 0 && typeof p == "object" && p !== null) {
      const g = { ...l };
      return Object.keys(p).forEach((y) => {
        delete g[y];
      }), g;
    } else
      return l;
  }
  e.removeOverridden = r;
  function n(i, l) {
    if ((i instanceof Be || i instanceof bn) && typeof l == "string" || (i instanceof Ae || i instanceof gn) && typeof l == "string")
      return i.data(l);
    if (typeof l == "number" && Array.isArray(i) || typeof l == "string" && typeof i == "object" && i !== null)
      return i[l];
  }
  e.zoomOnce = n;
  function a(i, l, f = 0) {
    for (; f < l.length && i !== void 0;)
      i = n(i, l[f]), f += 1;
    return i;
  }
  e.zoom = a;
  function s(i, l) {
    const f = [];
    function p(g, y) {
      if (g instanceof Kt && g.id === l.id)
        f.push(y);
      else if (g instanceof Ae)
        for (let S = 0; S < g.length; S++)
          p(g[S].data, [...y, g[S].id]);
      else if (g instanceof Be)
        g.traverse((S, U) => {
          p(S, [...y, U]);
        });
      else if (Array.isArray(g))
        for (let S = 0; S < g.length; S++)
          p(g[S], [...y, S]);
      else {
        if (Ra(g))
          return;
        if (typeof g == "object" && g !== null)
          for (const S in g)
            p(g[S], [...y, S]);
      }
    }
    return p(i, []), f;
  }
  e.findPathes = s;
})(ie || (ie = {}));
function Te(e, t) {
  const r = [];
  if (t.length === e.length) {
    let n = 0;
    for (; n < e.length;) {
      if (t[n] === "*")
        r.push(e[n]);
      else if (e[n] !== t[n]) return null;
      n += 1;
    }
  } else
    return null;
  return r;
}
var Ga;
try {
  Ga = new TextDecoder();
} catch {
}
var x, Ke, d = 0, J = {}, F, ot, De = 0, He = 0, fe, Ye, he = [], z, Co = {
  useRecords: !1,
  mapsAsObjects: !0
};
class xi {
}
const Oi = new xi();
Oi.name = "MessagePack 0xC1";
var it = !1, Ei = 2, Uc;
try {
  new Function("");
} catch {
  Ei = 1 / 0;
}
class Br {
  constructor(t) {
    t && (t.useRecords === !1 && t.mapsAsObjects === void 0 && (t.mapsAsObjects = !0), t.sequential && t.trusted !== !1 && (t.trusted = !0, !t.structures && t.useRecords != !1 && (t.structures = [], t.maxSharedStructures || (t.maxSharedStructures = 0))), t.structures ? t.structures.sharedLength = t.structures.length : t.getStructures && ((t.structures = []).uninitialized = !0, t.structures.sharedLength = 0), t.int64AsNumber && (t.int64AsType = "number")), Object.assign(this, t);
  }
  unpack(t, r) {
    if (x)
      return Ri(() => (Za(), this ? this.unpack(t, r) : Br.prototype.unpack.call(Co, t, r)));
    !t.buffer && t.constructor === ArrayBuffer && (t = typeof Buffer < "u" ? Buffer.from(t) : new Uint8Array(t)), typeof r == "object" ? (Ke = r.end || t.length, d = r.start || 0) : (d = 0, Ke = r > -1 ? r : t.length), He = 0, ot = null, fe = null, x = t;
    try {
      z = t.dataView || (t.dataView = new DataView(t.buffer, t.byteOffset, t.byteLength));
    } catch (n) {
      throw x = null, t instanceof Uint8Array ? n : new Error("Source must be a Uint8Array or Buffer but was a " + (t && typeof t == "object" ? t.constructor.name : typeof t));
    }
    if (this instanceof Br) {
      if (J = this, this.structures)
        return F = this.structures, kn();
      (!F || F.length > 0) && (F = []);
    } else
      J = Co, (!F || F.length > 0) && (F = []);
    return kn();
  }
  unpackMultiple(t, r) {
    let n, a = 0;
    try {
      it = !0;
      let s = t.length, i = this ? this.unpack(t, s) : Ua.unpack(t, s);
      if (r) {
        if (r(i, a, d) === !1) return;
        for (; d < s;)
          if (a = d, r(kn(), a, d) === !1)
            return;
      } else {
        for (n = [i]; d < s;)
          a = d, n.push(kn());
        return n;
      }
    } catch (s) {
      throw s.lastPosition = a, s.values = n, s;
    } finally {
      it = !1, Za();
    }
  }
  _mergeStructures(t, r) {
    t = t || [], Object.isFrozen(t) && (t = t.map((n) => n.slice(0)));
    for (let n = 0, a = t.length; n < a; n++) {
      let s = t[n];
      s && (s.isShared = !0, n >= 32 && (s.highByte = n - 32 >> 5));
    }
    t.sharedLength = t.length;
    for (let n in r || [])
      if (n >= 0) {
        let a = t[n], s = r[n];
        s && (a && ((t.restoreStructures || (t.restoreStructures = []))[n] = a), t[n] = s);
      }
    return this.structures = t;
  }
  decode(t, r) {
    return this.unpack(t, r);
  }
}
function kn(e) {
  try {
    if (!J.trusted && !it) {
      let r = F.sharedLength || 0;
      r < F.length && (F.length = r);
    }
    let t;
    if (J.randomAccessStructure && x[d] < 64 && x[d] >= 32 && Uc || (t = ne()), fe && (d = fe.postBundlePosition, fe = null), it && (F.restoreStructures = null), d == Ke)
      F && F.restoreStructures && $o(), F = null, x = null, Ye && (Ye = null);
    else {
      if (d > Ke)
        throw new Error("Unexpected end of MessagePack data");
      if (!it) {
        let r;
        try {
          r = JSON.stringify(t, (n, a) => typeof a == "bigint" ? `${a}n` : a).slice(0, 100);
        } catch (n) {
          r = "(JSON view not available " + n + ")";
        }
        throw new Error("Data read, but end of buffer not reached " + r);
      }
    }
    return t;
  } catch (t) {
    throw F && F.restoreStructures && $o(), Za(), (t instanceof RangeError || t.message.startsWith("Unexpected end of buffer") || d > Ke) && (t.incomplete = !0), t;
  }
}
function $o() {
  for (let e in F.restoreStructures)
    F[e] = F.restoreStructures[e];
  F.restoreStructures = null;
}
function ne() {
  let e = x[d++];
  if (e < 160)
    if (e < 128) {
      if (e < 64)
        return e;
      {
        let t = F[e & 63] || J.getStructures && Di()[e & 63];
        return t ? (t.read || (t.read = yo(t, e & 63)), t.read()) : e;
      }
    } else if (e < 144)
      if (e -= 128, J.mapsAsObjects) {
        let t = {};
        for (let r = 0; r < e; r++) {
          let n = Ii();
          n === "__proto__" && (n = "__proto_"), t[n] = ne();
        }
        return t;
      } else {
        let t = /* @__PURE__ */ new Map();
        for (let r = 0; r < e; r++)
          t.set(ne(), ne());
        return t;
      }
    else {
      e -= 144;
      let t = new Array(e);
      for (let r = 0; r < e; r++)
        t[r] = ne();
      return J.freezeData ? Object.freeze(t) : t;
    }
  else if (e < 192) {
    let t = e - 160;
    if (He >= d)
      return ot.slice(d - De, (d += t) - De);
    if (He == 0 && Ke < 140) {
      let r = t < 16 ? vo(t) : Pi(t);
      if (r != null)
        return r;
    }
    return qa(t);
  } else {
    let t;
    switch (e) {
      case 192:
        return null;
      case 193:
        return fe ? (t = ne(), t > 0 ? fe[1].slice(fe.position1, fe.position1 += t) : fe[0].slice(fe.position0, fe.position0 -= t)) : Oi;
      // "never-used", return special object to denote that
      case 194:
        return !1;
      case 195:
        return !0;
      case 196:
        if (t = x[d++], t === void 0)
          throw new Error("Unexpected end of buffer");
        return za(t);
      case 197:
        return t = z.getUint16(d), d += 2, za(t);
      case 198:
        return t = z.getUint32(d), d += 4, za(t);
      case 199:
        return gt(x[d++]);
      case 200:
        return t = z.getUint16(d), d += 2, gt(t);
      case 201:
        return t = z.getUint32(d), d += 4, gt(t);
      case 202:
        if (t = z.getFloat32(d), J.useFloat32 > 2) {
          let r = mo[(x[d] & 127) << 1 | x[d + 1] >> 7];
          return d += 4, (r * t + (t > 0 ? 0.5 : -0.5) >> 0) / r;
        }
        return d += 4, t;
      case 203:
        return t = z.getFloat64(d), d += 8, t;
      // uint handlers
      case 204:
        return x[d++];
      case 205:
        return t = z.getUint16(d), d += 2, t;
      case 206:
        return t = z.getUint32(d), d += 4, t;
      case 207:
        return J.int64AsType === "number" ? (t = z.getUint32(d) * 4294967296, t += z.getUint32(d + 4)) : J.int64AsType === "string" ? t = z.getBigUint64(d).toString() : J.int64AsType === "auto" ? (t = z.getBigUint64(d), t <= BigInt(2) << BigInt(52) && (t = Number(t))) : t = z.getBigUint64(d), d += 8, t;
      // int handlers
      case 208:
        return z.getInt8(d++);
      case 209:
        return t = z.getInt16(d), d += 2, t;
      case 210:
        return t = z.getInt32(d), d += 4, t;
      case 211:
        return J.int64AsType === "number" ? (t = z.getInt32(d) * 4294967296, t += z.getUint32(d + 4)) : J.int64AsType === "string" ? t = z.getBigInt64(d).toString() : J.int64AsType === "auto" ? (t = z.getBigInt64(d), t >= BigInt(-2) << BigInt(52) && t <= BigInt(2) << BigInt(52) && (t = Number(t))) : t = z.getBigInt64(d), d += 8, t;
      case 212:
        if (t = x[d++], t == 114)
          return Mo(x[d++] & 63);
        {
          let r = he[t];
          if (r)
            return r.read ? (d++, r.read(ne())) : r.noBuffer ? (d++, r()) : r(x.subarray(d, ++d));
          throw new Error("Unknown extension " + t);
        }
      case 213:
        return t = x[d], t == 114 ? (d++, Mo(x[d++] & 63, x[d++])) : gt(2);
      case 214:
        return gt(4);
      case 215:
        return gt(8);
      case 216:
        return gt(16);
      case 217:
        return t = x[d++], He >= d ? ot.slice(d - De, (d += t) - De) : Bc(t);
      case 218:
        return t = z.getUint16(d), d += 2, He >= d ? ot.slice(d - De, (d += t) - De) : Mc(t);
      case 219:
        return t = z.getUint32(d), d += 4, He >= d ? ot.slice(d - De, (d += t) - De) : Lc(t);
      case 220:
        return t = z.getUint16(d), d += 2, To(t);
      case 221:
        return t = z.getUint32(d), d += 4, To(t);
      case 222:
        return t = z.getUint16(d), d += 2, Uo(t);
      case 223:
        return t = z.getUint32(d), d += 4, Uo(t);
      default:
        if (e >= 224)
          return e - 256;
        if (e === void 0) {
          let r = new Error("Unexpected end of MessagePack data");
          throw r.incomplete = !0, r;
        }
        throw new Error("Unknown MessagePack token " + e);
    }
  }
}
const jc = /^[a-zA-Z_$][a-zA-Z\d_$]*$/;
function yo(e, t) {
  function r() {
    if (r.count++ > Ei) {
      let a = e.read = new Function("r", "return function(){return " + (J.freezeData ? "Object.freeze" : "") + "({" + e.map((s) => s === "__proto__" ? "__proto_:r()" : jc.test(s) ? s + ":r()" : "[" + JSON.stringify(s) + "]:r()").join(",") + "})}")(ne);
      return e.highByte === 0 && (e.read = Ro(t, e.read)), a();
    }
    let n = {};
    for (let a = 0, s = e.length; a < s; a++) {
      let i = e[a];
      i === "__proto__" && (i = "__proto_"), n[i] = ne();
    }
    return J.freezeData ? Object.freeze(n) : n;
  }
  return r.count = 0, e.highByte === 0 ? Ro(t, r) : r;
}
const Ro = (e, t) => function () {
  let r = x[d++];
  if (r === 0)
    return t();
  let n = e < 32 ? -(e + (r << 5)) : e + (r << 5), a = F[n] || Di()[n];
  if (!a)
    throw new Error("Record id is not defined for " + n);
  return a.read || (a.read = yo(a, e)), a.read();
};
function Di() {
  let e = Ri(() => (x = null, J.getStructures()));
  return F = J._mergeStructures(e, F);
}
var qa = yn, Bc = yn, Mc = yn, Lc = yn;
function yn(e) {
  let t;
  if (e < 16 && (t = vo(e)))
    return t;
  if (e > 64 && Ga)
    return Ga.decode(x.subarray(d, d += e));
  const r = d + e, n = [];
  for (t = ""; d < r;) {
    const a = x[d++];
    if ((a & 128) === 0)
      n.push(a);
    else if ((a & 224) === 192) {
      const s = x[d++] & 63;
      n.push((a & 31) << 6 | s);
    } else if ((a & 240) === 224) {
      const s = x[d++] & 63, i = x[d++] & 63;
      n.push((a & 31) << 12 | s << 6 | i);
    } else if ((a & 248) === 240) {
      const s = x[d++] & 63, i = x[d++] & 63, l = x[d++] & 63;
      let f = (a & 7) << 18 | s << 12 | i << 6 | l;
      f > 65535 && (f -= 65536, n.push(f >>> 10 & 1023 | 55296), f = 56320 | f & 1023), n.push(f);
    } else
      n.push(a);
    n.length >= 4096 && (t += le.apply(String, n), n.length = 0);
  }
  return n.length > 0 && (t += le.apply(String, n)), t;
}
function To(e) {
  let t = new Array(e);
  for (let r = 0; r < e; r++)
    t[r] = ne();
  return J.freezeData ? Object.freeze(t) : t;
}
function Uo(e) {
  if (J.mapsAsObjects) {
    let t = {};
    for (let r = 0; r < e; r++) {
      let n = Ii();
      n === "__proto__" && (n = "__proto_"), t[n] = ne();
    }
    return t;
  } else {
    let t = /* @__PURE__ */ new Map();
    for (let r = 0; r < e; r++)
      t.set(ne(), ne());
    return t;
  }
}
var le = String.fromCharCode;
function Pi(e) {
  let t = d, r = new Array(e);
  for (let n = 0; n < e; n++) {
    const a = x[d++];
    if ((a & 128) > 0) {
      d = t;
      return;
    }
    r[n] = a;
  }
  return le.apply(String, r);
}
function vo(e) {
  if (e < 4)
    if (e < 2) {
      if (e === 0)
        return "";
      {
        let t = x[d++];
        if ((t & 128) > 1) {
          d -= 1;
          return;
        }
        return le(t);
      }
    } else {
      let t = x[d++], r = x[d++];
      if ((t & 128) > 0 || (r & 128) > 0) {
        d -= 2;
        return;
      }
      if (e < 3)
        return le(t, r);
      let n = x[d++];
      if ((n & 128) > 0) {
        d -= 3;
        return;
      }
      return le(t, r, n);
    }
  else {
    let t = x[d++], r = x[d++], n = x[d++], a = x[d++];
    if ((t & 128) > 0 || (r & 128) > 0 || (n & 128) > 0 || (a & 128) > 0) {
      d -= 4;
      return;
    }
    if (e < 6) {
      if (e === 4)
        return le(t, r, n, a);
      {
        let s = x[d++];
        if ((s & 128) > 0) {
          d -= 5;
          return;
        }
        return le(t, r, n, a, s);
      }
    } else if (e < 8) {
      let s = x[d++], i = x[d++];
      if ((s & 128) > 0 || (i & 128) > 0) {
        d -= 6;
        return;
      }
      if (e < 7)
        return le(t, r, n, a, s, i);
      let l = x[d++];
      if ((l & 128) > 0) {
        d -= 7;
        return;
      }
      return le(t, r, n, a, s, i, l);
    } else {
      let s = x[d++], i = x[d++], l = x[d++], f = x[d++];
      if ((s & 128) > 0 || (i & 128) > 0 || (l & 128) > 0 || (f & 128) > 0) {
        d -= 8;
        return;
      }
      if (e < 10) {
        if (e === 8)
          return le(t, r, n, a, s, i, l, f);
        {
          let p = x[d++];
          if ((p & 128) > 0) {
            d -= 9;
            return;
          }
          return le(t, r, n, a, s, i, l, f, p);
        }
      } else if (e < 12) {
        let p = x[d++], g = x[d++];
        if ((p & 128) > 0 || (g & 128) > 0) {
          d -= 10;
          return;
        }
        if (e < 11)
          return le(t, r, n, a, s, i, l, f, p, g);
        let y = x[d++];
        if ((y & 128) > 0) {
          d -= 11;
          return;
        }
        return le(t, r, n, a, s, i, l, f, p, g, y);
      } else {
        let p = x[d++], g = x[d++], y = x[d++], S = x[d++];
        if ((p & 128) > 0 || (g & 128) > 0 || (y & 128) > 0 || (S & 128) > 0) {
          d -= 12;
          return;
        }
        if (e < 14) {
          if (e === 12)
            return le(t, r, n, a, s, i, l, f, p, g, y, S);
          {
            let U = x[d++];
            if ((U & 128) > 0) {
              d -= 13;
              return;
            }
            return le(t, r, n, a, s, i, l, f, p, g, y, S, U);
          }
        } else {
          let U = x[d++], j = x[d++];
          if ((U & 128) > 0 || (j & 128) > 0) {
            d -= 14;
            return;
          }
          if (e < 15)
            return le(t, r, n, a, s, i, l, f, p, g, y, S, U, j);
          let P = x[d++];
          if ((P & 128) > 0) {
            d -= 15;
            return;
          }
          return le(t, r, n, a, s, i, l, f, p, g, y, S, U, j, P);
        }
      }
    }
  }
}
function jo() {
  let e = x[d++], t;
  if (e < 192)
    t = e - 160;
  else
    switch (e) {
      case 217:
        t = x[d++];
        break;
      case 218:
        t = z.getUint16(d), d += 2;
        break;
      case 219:
        t = z.getUint32(d), d += 4;
        break;
      default:
        throw new Error("Expected string");
    }
  return yn(t);
}
function za(e) {
  return J.copyBuffers ? (
    // specifically use the copying slice (not the node one)
    Uint8Array.prototype.slice.call(x, d, d += e)
  ) : x.subarray(d, d += e);
}
function gt(e) {
  let t = x[d++];
  if (he[t]) {
    let r;
    return he[t](x.subarray(d, r = d += e), (n) => {
      d = n;
      try {
        return ne();
      } finally {
        d = r;
      }
    });
  } else
    throw new Error("Unknown extension type " + t);
}
var Bo = new Array(4096);
function Ii() {
  let e = x[d++];
  if (e >= 160 && e < 192) {
    if (e = e - 160, He >= d)
      return ot.slice(d - De, (d += e) - De);
    if (!(He == 0 && Ke < 180))
      return qa(e);
  } else
    return d--, Ci(ne());
  let t = (e << 5 ^ (e > 1 ? z.getUint16(d) : e > 0 ? x[d] : 0)) & 4095, r = Bo[t], n = d, a = d + e - 3, s, i = 0;
  if (r && r.bytes == e) {
    for (; n < a;) {
      if (s = z.getUint32(n), s != r[i++]) {
        n = 1879048192;
        break;
      }
      n += 4;
    }
    for (a += 3; n < a;)
      if (s = x[n++], s != r[i++]) {
        n = 1879048192;
        break;
      }
    if (n === a)
      return d = n, r.string;
    a -= 3, n = d;
  }
  for (r = [], Bo[t] = r, r.bytes = e; n < a;)
    s = z.getUint32(n), r.push(s), n += 4;
  for (a += 3; n < a;)
    s = x[n++], r.push(s);
  let l = e < 16 ? vo(e) : Pi(e);
  return l != null ? r.string = l : r.string = qa(e);
}
function Ci(e) {
  if (typeof e == "string") return e;
  if (typeof e == "number" || typeof e == "boolean" || typeof e == "bigint") return e.toString();
  if (e == null) return e + "";
  throw new Error("Invalid property type for record", typeof e);
}
const Mo = (e, t) => {
  let r = ne().map(Ci), n = e;
  t !== void 0 && (e = e < 32 ? -((t << 5) + e) : (t << 5) + e, r.highByte = t);
  let a = F[e];
  return a && (a.isShared || it) && ((F.restoreStructures || (F.restoreStructures = []))[e] = a), F[e] = r, r.read = yo(r, n), r.read();
};
he[0] = () => {
};
he[0].noBuffer = !0;
he[66] = (e) => {
  let t = e.length, r = BigInt(e[0] & 128 ? e[0] - 256 : e[0]);
  for (let n = 1; n < t; n++)
    r <<= BigInt(8), r += BigInt(e[n]);
  return r;
};
let zc = { Error, TypeError, ReferenceError };
he[101] = () => {
  let e = ne();
  return (zc[e[0]] || Error)(e[1], { cause: e[2] });
};
he[105] = (e) => {
  if (J.structuredClone === !1) throw new Error("Structured clone extension is disabled");
  let t = z.getUint32(d - 4);
  Ye || (Ye = /* @__PURE__ */ new Map());
  let r = x[d], n;
  r >= 144 && r < 160 || r == 220 || r == 221 ? n = [] : n = {};
  let a = { target: n };
  Ye.set(t, a);
  let s = ne();
  return a.used ? Object.assign(n, s) : (a.target = s, s);
};
he[112] = (e) => {
  if (J.structuredClone === !1) throw new Error("Structured clone extension is disabled");
  let t = z.getUint32(d - 4), r = Ye.get(t);
  return r.used = !0, r.target;
};
he[115] = () => new Set(ne());
const $i = ["Int8", "Uint8", "Uint8Clamped", "Int16", "Uint16", "Int32", "Uint32", "Float32", "Float64", "BigInt64", "BigUint64"].map((e) => e + "Array");
let Fc = typeof globalThis == "object" ? globalThis : window;
he[116] = (e) => {
  let t = e[0], r = $i[t];
  if (!r) {
    if (t === 16) {
      let n = new ArrayBuffer(e.length - 1);
      return new Uint8Array(n).set(e.subarray(1)), n;
    }
    throw new Error("Could not find typed array for code " + t);
  }
  return new Fc[r](Uint8Array.prototype.slice.call(e, 1).buffer);
};
he[120] = () => {
  let e = ne();
  return new RegExp(e[0], e[1]);
};
const Vc = [];
he[98] = (e) => {
  let t = (e[0] << 24) + (e[1] << 16) + (e[2] << 8) + e[3], r = d;
  return d += t - e.length, fe = Vc, fe = [jo(), jo()], fe.position0 = 0, fe.position1 = 0, fe.postBundlePosition = d, d = r, ne();
};
he[255] = (e) => e.length == 4 ? new Date((e[0] * 16777216 + (e[1] << 16) + (e[2] << 8) + e[3]) * 1e3) : e.length == 8 ? new Date(
  ((e[0] << 22) + (e[1] << 14) + (e[2] << 6) + (e[3] >> 2)) / 1e6 + ((e[3] & 3) * 4294967296 + e[4] * 16777216 + (e[5] << 16) + (e[6] << 8) + e[7]) * 1e3
) : e.length == 12 ? new Date(
  ((e[0] << 24) + (e[1] << 16) + (e[2] << 8) + e[3]) / 1e6 + ((e[4] & 128 ? -281474976710656 : 0) + e[6] * 1099511627776 + e[7] * 4294967296 + e[8] * 16777216 + (e[9] << 16) + (e[10] << 8) + e[11]) * 1e3
) : /* @__PURE__ */ new Date("invalid");
function Ri(e) {
  let t = Ke, r = d, n = De, a = He, s = ot, i = Ye, l = fe, f = new Uint8Array(x.slice(0, Ke)), p = F, g = F.slice(0, F.length), y = J, S = it, U = e();
  return Ke = t, d = r, De = n, He = a, ot = s, Ye = i, fe = l, x = f, it = S, F = p, F.splice(0, F.length, ...g), J = y, z = new DataView(x.buffer, x.byteOffset, x.byteLength), U;
}
function Za() {
  x = null, Ye = null, F = null;
}
function Nc(e) {
  e.unpack ? he[e.type] = e.unpack : he[e.type] = e;
}
const mo = new Array(147);
for (let e = 0; e < 256; e++)
  mo[e] = +("1e" + Math.floor(45.15 - e * 0.30103));
var Ua = new Br({ useRecords: !1 });
Ua.unpack;
Ua.unpackMultiple;
Ua.unpack;
let Hc = new Float32Array(1);
new Uint8Array(Hc.buffer, 0, 4);
let On;
try {
  On = new TextEncoder();
} catch {
}
let Vn, ko;
const ja = typeof Buffer < "u", Sn = ja ? function (e) {
  return Buffer.allocUnsafeSlow(e);
} : Uint8Array, Ti = ja ? Buffer : Uint8Array, Lo = ja ? 4294967296 : 2144337920;
let _, ur, Y, h = 0, we, X = null, Wc;
const Kc = 21760, Gc = /[\u0080-\uFFFF]/, Ft = Symbol("record-id");
class Ui extends Br {
  constructor(t) {
    super(t), this.offset = 0;
    let r, n, a, s, i = Ti.prototype.utf8Write ? function (b, E) {
      return _.utf8Write(b, E, _.byteLength - E);
    } : On && On.encodeInto ? function (b, E) {
      return On.encodeInto(b, _.subarray(E)).written;
    } : !1, l = this;
    t || (t = {});
    let f = t && t.sequential, p = t.structures || t.saveStructures, g = t.maxSharedStructures;
    if (g == null && (g = p ? 32 : 0), g > 8160)
      throw new Error("Maximum maxSharedStructure is 8160");
    t.structuredClone && t.moreTypes == null && (this.moreTypes = !0);
    let y = t.maxOwnStructures;
    y == null && (y = p ? 32 : 64), !this.structures && t.useRecords != !1 && (this.structures = []);
    let S = g > 32 || y + g > 64, U = g + 64, j = g + y + 64;
    if (j > 8256)
      throw new Error("Maximum maxSharedStructure + maxOwnStructure is 8192");
    let P = [], B = 0, R = 0;
    this.pack = this.encode = function (b, E) {
      if (_ || (_ = new Sn(8192), Y = _.dataView || (_.dataView = new DataView(_.buffer, 0, 8192)), h = 0), we = _.length - 10, we - h < 2048 ? (_ = new Sn(_.length), Y = _.dataView || (_.dataView = new DataView(_.buffer, 0, _.length)), we = _.length - 10, h = 0) : h = h + 7 & 2147483640, r = h, E & Xc && (h += E & 255), s = l.structuredClone ? /* @__PURE__ */ new Map() : null, l.bundleStrings && typeof b != "string" ? (X = [], X.size = 1 / 0) : X = null, a = l.structures, a) {
        a.uninitialized && (a = l._mergeStructures(l.getStructures()));
        let m = a.sharedLength || 0;
        if (m > g)
          throw new Error("Shared structures is larger than maximum shared structures, try increasing maxSharedStructures to " + a.sharedLength);
        if (!a.transitions) {
          a.transitions = /* @__PURE__ */ Object.create(null);
          for (let O = 0; O < m; O++) {
            let T = a[O];
            if (!T)
              continue;
            let H, L = a.transitions;
            for (let G = 0, q = T.length; G < q; G++) {
              let Fe = T[G];
              H = L[Fe], H || (H = L[Fe] = /* @__PURE__ */ Object.create(null)), L = H;
            }
            L[Ft] = O + 64;
          }
          this.lastNamedStructuresLength = m;
        }
        f || (a.nextId = m + 64);
      }
      n && (n = !1);
      let A;
      try {
        l.randomAccessStructure && b && b.constructor && b.constructor === Object ? yc(b) : Z(b);
        let m = X;
        if (X && Vo(r, Z, 0), s && s.idsToInsert) {
          let O = s.idsToInsert.sort((G, q) => G.offset > q.offset ? 1 : -1), T = O.length, H = -1;
          for (; m && T > 0;) {
            let G = O[--T].offset + r;
            G < m.stringsPosition + r && H === -1 && (H = 0), G > m.position + r ? H >= 0 && (H += 6) : (H >= 0 && (Y.setUint32(
              m.position + r,
              Y.getUint32(m.position + r) + H
            ), H = -1), m = m.previous, T++);
          }
          H >= 0 && m && Y.setUint32(
            m.position + r,
            Y.getUint32(m.position + r) + H
          ), h += O.length * 6, h > we && be(h), l.offset = h;
          let L = Zc(_.subarray(r, h), O);
          return s = null, L;
        }
        return l.offset = h, E & Jc ? (_.start = r, _.end = h, _) : _.subarray(r, h);
      } catch (m) {
        throw A = m, m;
      } finally {
        if (a && (N(), n && l.saveStructures)) {
          let m = a.sharedLength || 0, O = _.subarray(r, h), T = Yc(a, l);
          if (!A)
            return l.saveStructures(T, T.isCompatible) === !1 ? l.pack(b, E) : (l.lastNamedStructuresLength = m, _.length > 1073741824 && (_ = null), O);
        }
        _.length > 1073741824 && (_ = null), E & Qc && (h = r);
      }
    };
    const N = () => {
      R < 10 && R++;
      let b = a.sharedLength || 0;
      if (a.length > b && !f && (a.length = b), B > 1e4)
        a.transitions = null, R = 0, B = 0, P.length > 0 && (P = []);
      else if (P.length > 0 && !f) {
        for (let E = 0, A = P.length; E < A; E++)
          P[E][Ft] = 0;
        P = [];
      }
    }, oe = (b) => {
      var E = b.length;
      E < 16 ? _[h++] = 144 | E : E < 65536 ? (_[h++] = 220, _[h++] = E >> 8, _[h++] = E & 255) : (_[h++] = 221, Y.setUint32(h, E), h += 4);
      for (let A = 0; A < E; A++)
        Z(b[A]);
    }, Z = (b) => {
      h > we && (_ = be(h));
      var E = typeof b, A;
      if (E === "string") {
        let m = b.length;
        if (X && m >= 4 && m < 4096) {
          if ((X.size += m) > Kc) {
            let L, G = (X[0] ? X[0].length * 3 + X[1].length : 0) + 10;
            h + G > we && (_ = be(h + G));
            let q;
            X.position ? (q = X, _[h] = 200, h += 3, _[h++] = 98, L = h - r, h += 4, Vo(r, Z, 0), Y.setUint16(L + r - 3, h - r - L)) : (_[h++] = 214, _[h++] = 98, L = h - r, h += 4), X = ["", ""], X.previous = q, X.size = 0, X.position = L;
          }
          let H = Gc.test(b);
          X[H ? 0 : 1] += b, _[h++] = 193, Z(H ? -m : m);
          return;
        }
        let O;
        m < 32 ? O = 1 : m < 256 ? O = 2 : m < 65536 ? O = 3 : O = 5;
        let T = m * 3;
        if (h + T > we && (_ = be(h + T)), m < 64 || !i) {
          let H, L, G, q = h + O;
          for (H = 0; H < m; H++)
            L = b.charCodeAt(H), L < 128 ? _[q++] = L : L < 2048 ? (_[q++] = L >> 6 | 192, _[q++] = L & 63 | 128) : (L & 64512) === 55296 && ((G = b.charCodeAt(H + 1)) & 64512) === 56320 ? (L = 65536 + ((L & 1023) << 10) + (G & 1023), H++, _[q++] = L >> 18 | 240, _[q++] = L >> 12 & 63 | 128, _[q++] = L >> 6 & 63 | 128, _[q++] = L & 63 | 128) : (_[q++] = L >> 12 | 224, _[q++] = L >> 6 & 63 | 128, _[q++] = L & 63 | 128);
          A = q - h - O;
        } else
          A = i(b, h + O);
        A < 32 ? _[h++] = 160 | A : A < 256 ? (O < 2 && _.copyWithin(h + 2, h + 1, h + 1 + A), _[h++] = 217, _[h++] = A) : A < 65536 ? (O < 3 && _.copyWithin(h + 3, h + 2, h + 2 + A), _[h++] = 218, _[h++] = A >> 8, _[h++] = A & 255) : (O < 5 && _.copyWithin(h + 5, h + 3, h + 3 + A), _[h++] = 219, Y.setUint32(h, A), h += 4), h += A;
      } else if (E === "number")
        if (b >>> 0 === b)
          b < 32 || b < 128 && this.useRecords === !1 || b < 64 && !this.randomAccessStructure ? _[h++] = b : b < 256 ? (_[h++] = 204, _[h++] = b) : b < 65536 ? (_[h++] = 205, _[h++] = b >> 8, _[h++] = b & 255) : (_[h++] = 206, Y.setUint32(h, b), h += 4);
        else if (b >> 0 === b)
          b >= -32 ? _[h++] = 256 + b : b >= -128 ? (_[h++] = 208, _[h++] = b + 256) : b >= -32768 ? (_[h++] = 209, Y.setInt16(h, b), h += 2) : (_[h++] = 210, Y.setInt32(h, b), h += 4);
        else {
          let m;
          if ((m = this.useFloat32) > 0 && b < 4294967296 && b >= -2147483648) {
            _[h++] = 202, Y.setFloat32(h, b);
            let O;
            if (m < 4 || // this checks for rounding of numbers that were encoded in 32-bit float to nearest significant decimal digit that could be preserved
              (O = b * mo[(_[h] & 127) << 1 | _[h + 1] >> 7]) >> 0 === O) {
              h += 4;
              return;
            } else
              h--;
          }
          _[h++] = 203, Y.setFloat64(h, b), h += 8;
        }
      else if (E === "object" || E === "function")
        if (!b)
          _[h++] = 192;
        else {
          if (s) {
            let O = s.get(b);
            if (O) {
              if (!O.id) {
                let T = s.idsToInsert || (s.idsToInsert = []);
                O.id = T.push(O);
              }
              _[h++] = 214, _[h++] = 112, Y.setUint32(h, O.id), h += 4;
              return;
            } else
              s.set(b, { offset: h - r });
          }
          let m = b.constructor;
          if (m === Object)
            bt(b);
          else if (m === Array)
            oe(b);
          else if (m === Map)
            if (this.mapAsEmptyObject) _[h++] = 128;
            else {
              A = b.size, A < 16 ? _[h++] = 128 | A : A < 65536 ? (_[h++] = 222, _[h++] = A >> 8, _[h++] = A & 255) : (_[h++] = 223, Y.setUint32(h, A), h += 4);
              for (let [O, T] of b)
                Z(O), Z(T);
            }
          else {
            for (let O = 0, T = Vn.length; O < T; O++) {
              let H = ko[O];
              if (b instanceof H) {
                let L = Vn[O];
                if (L.write) {
                  L.type && (_[h++] = 212, _[h++] = L.type, _[h++] = 0);
                  let fr = L.write.call(this, b);
                  fr === b ? Array.isArray(b) ? oe(b) : bt(b) : Z(fr);
                  return;
                }
                let G = _, q = Y, Fe = h;
                _ = null;
                let tt;
                try {
                  tt = L.pack.call(this, b, (fr) => (_ = G, G = null, h += fr, h > we && be(h), {
                    target: _,
                    targetView: Y,
                    position: h - fr
                  }), Z);
                } finally {
                  G && (_ = G, Y = q, h = Fe, we = _.length - 10);
                }
                tt && (tt.length + h > we && be(tt.length + h), h = qc(tt, _, h, L.type));
                return;
              }
            }
            if (Array.isArray(b))
              oe(b);
            else {
              if (b.toJSON) {
                const O = b.toJSON();
                if (O !== b)
                  return Z(O);
              }
              if (E === "function")
                return Z(this.writeFunction && this.writeFunction(b));
              bt(b);
            }
          }
        }
      else if (E === "boolean")
        _[h++] = b ? 195 : 194;
      else if (E === "bigint") {
        if (b < BigInt(1) << BigInt(63) && b >= -(BigInt(1) << BigInt(63)))
          _[h++] = 211, Y.setBigInt64(h, b);
        else if (b < BigInt(1) << BigInt(64) && b > 0)
          _[h++] = 207, Y.setBigUint64(h, b);
        else if (this.largeBigIntToFloat)
          _[h++] = 203, Y.setFloat64(h, Number(b));
        else {
          if (this.largeBigIntToString)
            return Z(b.toString());
          if (this.useBigIntExtension && b < BigInt(2) ** BigInt(1023) && b > -(BigInt(2) ** BigInt(1023))) {
            _[h++] = 199, h++, _[h++] = 66;
            let m = [], O;
            do {
              let T = b & BigInt(255);
              O = (T & BigInt(128)) === (b < BigInt(0) ? BigInt(128) : BigInt(0)), m.push(T), b >>= BigInt(8);
            } while (!((b === BigInt(0) || b === BigInt(-1)) && O));
            _[h - 2] = m.length;
            for (let T = m.length; T > 0;)
              _[h++] = Number(m[--T]);
            return;
          } else
            throw new RangeError(b + " was too large to fit in MessagePack 64-bit integer format, use useBigIntExtension, or set largeBigIntToFloat to convert to float-64, or set largeBigIntToString to convert to string");
        }
        h += 8;
      } else if (E === "undefined")
        this.encodeUndefinedAsNil ? _[h++] = 192 : (_[h++] = 212, _[h++] = 0, _[h++] = 0);
      else
        throw new Error("Unknown type: " + E);
    }, qe = this.variableMapSize || this.coercibleKeyAsNumber || this.skipValues ? (b) => {
      let E;
      if (this.skipValues) {
        E = [];
        for (let O in b)
          (typeof b.hasOwnProperty != "function" || b.hasOwnProperty(O)) && !this.skipValues.includes(b[O]) && E.push(O);
      } else
        E = Object.keys(b);
      let A = E.length;
      A < 16 ? _[h++] = 128 | A : A < 65536 ? (_[h++] = 222, _[h++] = A >> 8, _[h++] = A & 255) : (_[h++] = 223, Y.setUint32(h, A), h += 4);
      let m;
      if (this.coercibleKeyAsNumber)
        for (let O = 0; O < A; O++) {
          m = E[O];
          let T = Number(m);
          Z(isNaN(T) ? m : T), Z(b[m]);
        }
      else
        for (let O = 0; O < A; O++)
          Z(m = E[O]), Z(b[m]);
    } : (b) => {
      _[h++] = 222;
      let E = h - r;
      h += 2;
      let A = 0;
      for (let m in b)
        (typeof b.hasOwnProperty != "function" || b.hasOwnProperty(m)) && (Z(m), Z(b[m]), A++);
      if (A > 65535)
        throw new Error('Object is too large to serialize with fast 16-bit map size, use the "variableMapSize" option to serialize this object');
      _[E++ + r] = A >> 8, _[E + r] = A & 255;
    }, et = this.useRecords === !1 ? qe : t.progressiveRecords && !S ? (
      // this is about 2% faster for highly stable structures, since it only requires one for-in loop (but much more expensive when new structure needs to be written)
      (b) => {
        let E, A = a.transitions || (a.transitions = /* @__PURE__ */ Object.create(null)), m = h++ - r, O;
        for (let T in b)
          if (typeof b.hasOwnProperty != "function" || b.hasOwnProperty(T)) {
            if (E = A[T], E)
              A = E;
            else {
              let H = Object.keys(b), L = A;
              A = a.transitions;
              let G = 0;
              for (let q = 0, Fe = H.length; q < Fe; q++) {
                let tt = H[q];
                E = A[tt], E || (E = A[tt] = /* @__PURE__ */ Object.create(null), G++), A = E;
              }
              m + r + 1 == h ? (h--, ze(A, H, G)) : lr(A, H, m, G), O = !0, A = L[T];
            }
            Z(b[T]);
          }
        if (!O) {
          let T = A[Ft];
          T ? _[m + r] = T : lr(A, Object.keys(b), m, 0);
        }
      }
    ) : (b) => {
      let E, A = a.transitions || (a.transitions = /* @__PURE__ */ Object.create(null)), m = 0;
      for (let T in b) (typeof b.hasOwnProperty != "function" || b.hasOwnProperty(T)) && (E = A[T], E || (E = A[T] = /* @__PURE__ */ Object.create(null), m++), A = E);
      let O = A[Ft];
      O ? O >= 96 && S ? (_[h++] = ((O -= 96) & 31) + 96, _[h++] = O >> 5) : _[h++] = O : ze(A, A.__keys__ || Object.keys(b), m);
      for (let T in b)
        (typeof b.hasOwnProperty != "function" || b.hasOwnProperty(T)) && Z(b[T]);
    }, cr = typeof this.useRecords == "function" && this.useRecords, bt = cr ? (b) => {
      cr(b) ? et(b) : qe(b);
    } : et, be = (b) => {
      let E;
      if (b > 16777216) {
        if (b - r > Lo)
          throw new Error("Packed buffer would be larger than maximum buffer size");
        E = Math.min(
          Lo,
          Math.round(Math.max((b - r) * (b > 67108864 ? 1.25 : 2), 4194304) / 4096) * 4096
        );
      } else
        E = (Math.max(b - r << 2, _.length - 1) >> 12) + 1 << 12;
      let A = new Sn(E);
      return Y = A.dataView || (A.dataView = new DataView(A.buffer, 0, E)), b = Math.min(b, _.length), _.copy ? _.copy(A, 0, r, b) : A.set(_.slice(r, b)), h -= r, r = 0, we = A.length - 10, _ = A;
    }, ze = (b, E, A) => {
      let m = a.nextId;
      m || (m = 64), m < U && this.shouldShareStructure && !this.shouldShareStructure(E) ? (m = a.nextOwnId, m < j || (m = U), a.nextOwnId = m + 1) : (m >= j && (m = U), a.nextId = m + 1);
      let O = E.highByte = m >= 96 && S ? m - 96 >> 5 : -1;
      b[Ft] = m, b.__keys__ = E, a[m - 64] = E, m < U ? (E.isShared = !0, a.sharedLength = m - 63, n = !0, O >= 0 ? (_[h++] = (m & 31) + 96, _[h++] = O) : _[h++] = m) : (O >= 0 ? (_[h++] = 213, _[h++] = 114, _[h++] = (m & 31) + 96, _[h++] = O) : (_[h++] = 212, _[h++] = 114, _[h++] = m), A && (B += R * A), P.length >= y && (P.shift()[Ft] = 0), P.push(b), Z(E));
    }, lr = (b, E, A, m) => {
      let O = _, T = h, H = we, L = r;
      _ = ur, h = 0, r = 0, _ || (ur = _ = new Sn(8192)), we = _.length - 10, ze(b, E, m), ur = _;
      let G = h;
      if (_ = O, h = T, we = H, r = L, G > 1) {
        let q = h + G - 1;
        q > we && be(q);
        let Fe = A + r;
        _.copyWithin(Fe + G, Fe + 1, h), _.set(ur.slice(0, G), Fe), h = q;
      } else
        _[A + r] = ur[0];
    }, yc = (b) => {
      let E = Wc(b, _, r, h, a, be, (A, m, O) => {
        if (O)
          return n = !0;
        h = m;
        let T = _;
        return Z(A), N(), T !== _ ? { position: h, targetView: Y, target: _ } : h;
      }, this);
      if (E === 0)
        return bt(b);
      h = E;
    };
  }
  useBuffer(t) {
    _ = t, _.dataView || (_.dataView = new DataView(_.buffer, _.byteOffset, _.byteLength)), h = 0;
  }
  set position(t) {
    h = t;
  }
  get position() {
    return h;
  }
  clearSharedData() {
    this.structures && (this.structures = []), this.typedStructs && (this.typedStructs = []);
  }
}
ko = [Date, Set, Error, RegExp, ArrayBuffer, Object.getPrototypeOf(Uint8Array.prototype).constructor, xi];
Vn = [{
  pack(e, t, r) {
    let n = e.getTime() / 1e3;
    if ((this.useTimestamp32 || e.getMilliseconds() === 0) && n >= 0 && n < 4294967296) {
      let { target: a, targetView: s, position: i } = t(6);
      a[i++] = 214, a[i++] = 255, s.setUint32(i, n);
    } else if (n > 0 && n < 4294967296) {
      let { target: a, targetView: s, position: i } = t(10);
      a[i++] = 215, a[i++] = 255, s.setUint32(i, e.getMilliseconds() * 4e6 + (n / 1e3 / 4294967296 >> 0)), s.setUint32(i + 4, n);
    } else if (isNaN(n)) {
      if (this.onInvalidDate)
        return t(0), r(this.onInvalidDate());
      let { target: a, targetView: s, position: i } = t(3);
      a[i++] = 212, a[i++] = 255, a[i++] = 255;
    } else {
      let { target: a, targetView: s, position: i } = t(15);
      a[i++] = 199, a[i++] = 12, a[i++] = 255, s.setUint32(i, e.getMilliseconds() * 1e6), s.setBigInt64(i + 4, BigInt(Math.floor(n)));
    }
  }
}, {
  pack(e, t, r) {
    if (this.setAsEmptyObject)
      return t(0), r({});
    let n = Array.from(e), { target: a, position: s } = t(this.moreTypes ? 3 : 0);
    this.moreTypes && (a[s++] = 212, a[s++] = 115, a[s++] = 0), r(n);
  }
}, {
  pack(e, t, r) {
    let { target: n, position: a } = t(this.moreTypes ? 3 : 0);
    this.moreTypes && (n[a++] = 212, n[a++] = 101, n[a++] = 0), r([e.name, e.message, e.cause]);
  }
}, {
  pack(e, t, r) {
    let { target: n, position: a } = t(this.moreTypes ? 3 : 0);
    this.moreTypes && (n[a++] = 212, n[a++] = 120, n[a++] = 0), r([e.source, e.flags]);
  }
}, {
  pack(e, t) {
    this.moreTypes ? zo(e, 16, t) : Fo(ja ? Buffer.from(e) : new Uint8Array(e), t);
  }
}, {
  pack(e, t) {
    let r = e.constructor;
    r !== Ti && this.moreTypes ? zo(e, $i.indexOf(r.name), t) : Fo(e, t);
  }
}, {
  pack(e, t) {
    let { target: r, position: n } = t(1);
    r[n] = 193;
  }
}];
function zo(e, t, r, n) {
  let a = e.byteLength;
  if (a + 1 < 256) {
    var { target: s, position: i } = r(4 + a);
    s[i++] = 199, s[i++] = a + 1;
  } else if (a + 1 < 65536) {
    var { target: s, position: i } = r(5 + a);
    s[i++] = 200, s[i++] = a + 1 >> 8, s[i++] = a + 1 & 255;
  } else {
    var { target: s, position: i, targetView: l } = r(7 + a);
    s[i++] = 201, l.setUint32(i, a + 1), i += 4;
  }
  s[i++] = 116, s[i++] = t, e.buffer || (e = new Uint8Array(e)), s.set(new Uint8Array(e.buffer, e.byteOffset, e.byteLength), i);
}
function Fo(e, t) {
  let r = e.byteLength;
  var n, a;
  if (r < 256) {
    var { target: n, position: a } = t(r + 2);
    n[a++] = 196, n[a++] = r;
  } else if (r < 65536) {
    var { target: n, position: a } = t(r + 3);
    n[a++] = 197, n[a++] = r >> 8, n[a++] = r & 255;
  } else {
    var { target: n, position: a, targetView: s } = t(r + 5);
    n[a++] = 198, s.setUint32(a, r), a += 4;
  }
  n.set(e, a);
}
function qc(e, t, r, n) {
  let a = e.length;
  switch (a) {
    case 1:
      t[r++] = 212;
      break;
    case 2:
      t[r++] = 213;
      break;
    case 4:
      t[r++] = 214;
      break;
    case 8:
      t[r++] = 215;
      break;
    case 16:
      t[r++] = 216;
      break;
    default:
      a < 256 ? (t[r++] = 199, t[r++] = a) : a < 65536 ? (t[r++] = 200, t[r++] = a >> 8, t[r++] = a & 255) : (t[r++] = 201, t[r++] = a >> 24, t[r++] = a >> 16 & 255, t[r++] = a >> 8 & 255, t[r++] = a & 255);
  }
  return t[r++] = n, t.set(e, r), r += a, r;
}
function Zc(e, t) {
  let r, n = t.length * 6, a = e.length - n;
  for (; r = t.pop();) {
    let s = r.offset, i = r.id;
    e.copyWithin(s + n, s, a), n -= 6;
    let l = s + n;
    e[l++] = 214, e[l++] = 105, e[l++] = i >> 24, e[l++] = i >> 16 & 255, e[l++] = i >> 8 & 255, e[l++] = i & 255, a = s;
  }
  return e;
}
function Vo(e, t, r) {
  if (X.length > 0) {
    Y.setUint32(X.position + e, h + r - X.position - e), X.stringsPosition = h - e;
    let n = X;
    X = null, t(n[0]), t(n[1]);
  }
}
function or(e) {
  if (e.Class) {
    if (!e.pack && !e.write)
      throw new Error("Extension has no pack or write function");
    if (e.pack && !e.type)
      throw new Error("Extension has no type (numeric code to identify the extension)");
    ko.unshift(e.Class), Vn.unshift(e);
  }
  Nc(e);
}
function Yc(e, t) {
  return e.isCompatible = (r) => {
    let n = !r || (t.lastNamedStructuresLength || 0) === r.length;
    return n || t._mergeStructures(r), n;
  }, e;
}
let ji = new Ui({ useRecords: !1 });
ji.pack;
ji.pack;
const Jc = 512, Qc = 1024, Xc = 2048, No = new Ui({
  structuredClone: !0
  // FIXME!!!!!!!!!!!!!!!!!!! temp
});
or({
  Class: ye.prototype.constructor,
  type: 1,
  write(e) {
    return { ...e };
  },
  read(e) {
    return Object.setPrototypeOf(e, ye.prototype), e;
  }
});
or({
  Class: Ae.prototype.constructor,
  type: 2,
  write(e) {
    return [...e];
  },
  read(e) {
    return Object.setPrototypeOf(e, Ae.prototype), e;
  }
});
or({
  Class: Be.prototype.constructor,
  type: 3,
  write(e) {
    return [...e];
  },
  read(e) {
    return Object.setPrototypeOf(e, Be.prototype), e;
  }
});
or({
  Class: Kt.prototype.constructor,
  type: 4,
  write(e) {
    return e.id;
  },
  read(e) {
    return new Kt(e);
  }
});
or({
  Class: Do.prototype.constructor,
  type: 5,
  write(e) {
    return e.data;
  },
  read(e) {
    return new Do(e);
  }
});
or({
  Class: Ce.prototype.constructor,
  type: 6,
  write(e) {
    return { ...e };
  },
  read(e) {
    return Object.setPrototypeOf(e, Ce.prototype), e;
  }
});
function el(e) {
  let t = 0;
  if (e.length === 0) return t;
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    t = (t << 5) - t + n, t = t & t;
  }
  return t;
}
function Ya(e) {
  if (Ra(e))
    return e;
  if (Array.isArray(e))
    return e.map(Ya);
  if (typeof e == "object" && e !== null) {
    const t = {};
    for (const r of Object.keys(e).sort())
      t[r] = Ya(e[r]);
    return Object.setPrototypeOf(t, Object.getPrototypeOf(e)), t;
  } else
    return e;
}
var Ja;
((e) => {
  function t(a) {
    return No.pack(a);
  }
  e.serialize = t;
  function r(a) {
    return No.unpack(a);
  }
  e.deserialize = r;
  function n(a) {
    return el(t(Ya(a))).toString();
  }
  e.checksum = n;
})(Ja || (Ja = {}));
async function tl(e) {
  const t = new Blob([e]), r = URL.createObjectURL(t);
  return createImageBitmap(t).finally(() => {
    URL.revokeObjectURL(r);
  });
}
async function rl(e) {
  return fetch(e).then((t) => {
    if (!t.ok)
      throw new Error(`Failed to fetch image: ${t.statusText}`);
    return t.blob();
  }).then((t) => createImageBitmap(t));
}
function Bi(e) {
  e.preload = "auto", e.autoplay = !0, e.loop = !0, e.muted = !0, e.playsInline = !0, e.currentTime = 0.01, e.load(), e.onloadeddata = () => {
    e.muted = !0;
    const r = e.play();
    r !== void 0 && r.then((n) => {
    }).catch(() => {
      e.play();
    }).finally(() => {
      e.pause();
    });
  };
  let t = !1;
  return e.addEventListener("playing", function () {
    t = !0;
  }, !0), new Promise((r) => {
    const n = () => {
      t ? r(e) : setTimeout(n, 10);
    };
    n();
  });
}
async function nl(e) {
  const t = new Blob([e]), r = document.createElement("video");
  return r.src = URL.createObjectURL(t), Bi(r);
}
async function al(e) {
  return fetch(e).then((t) => {
    if (!t.ok)
      throw new Error(`Failed to fetch video: ${t.statusText}`);
    return t.blob();
  }).then(async (t) => {
    const r = document.createElement("video");
    return r.src = URL.createObjectURL(t), Bi(r);
  });
}
let k, Ze = new Array(128).fill(void 0);
Ze.push(void 0, null, !0, !1);
function c(e) {
  return Ze[e];
}
let Dr = Ze.length;
function v(e) {
  Dr === Ze.length && Ze.push(Ze.length + 1);
  const t = Dr;
  return Dr = Ze[t], Ze[t] = e, t;
}
function W(e, t) {
  try {
    return e.apply(this, t);
  } catch (r) {
    k.__wbindgen_export_0(v(r));
  }
}
let hr = null;
function Pr() {
  return (hr === null || hr.byteLength === 0) && (hr = new Uint8Array(k.memory.buffer)), hr;
}
let En = new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 });
En.decode();
const sl = 2146435072;
let Fa = 0;
function ol(e, t) {
  return Fa += t, Fa >= sl && (En = new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }), En.decode(), Fa = t), En.decode(Pr().subarray(e, e + t));
}
function ae(e, t) {
  return e = e >>> 0, ol(e, t);
}
let pr = null;
function il() {
  return (pr === null || pr.byteLength === 0) && (pr = new Float32Array(k.memory.buffer)), pr;
}
function Oe(e, t) {
  return e = e >>> 0, il().subarray(e / 4, e / 4 + t);
}
let _r = null;
function cl() {
  return (_r === null || _r.byteLength === 0) && (_r = new Int32Array(k.memory.buffer)), _r;
}
function Ho(e, t) {
  return e = e >>> 0, cl().subarray(e / 4, e / 4 + t);
}
function M(e) {
  return e == null;
}
let me = 0;
const Ir = new TextEncoder();
"encodeInto" in Ir || (Ir.encodeInto = function (e, t) {
  const r = Ir.encode(e);
  return t.set(r), {
    read: e.length,
    written: r.length
  };
});
function Ee(e, t, r) {
  if (r === void 0) {
    const l = Ir.encode(e), f = t(l.length, 1) >>> 0;
    return Pr().subarray(f, f + l.length).set(l), me = l.length, f;
  }
  let n = e.length, a = t(n, 1) >>> 0;
  const s = Pr();
  let i = 0;
  for (; i < n; i++) {
    const l = e.charCodeAt(i);
    if (l > 127) break;
    s[a + i] = l;
  }
  if (i !== n) {
    i !== 0 && (e = e.slice(i)), a = r(a, n, n = i + e.length * 3, 1) >>> 0;
    const l = Pr().subarray(a + i, a + n), f = Ir.encodeInto(e, l);
    i += f.written, a = r(a, n, i, 1) >>> 0;
  }
  return me = i, a;
}
let yt = null;
function te() {
  return (yt === null || yt.buffer.detached === !0 || yt.buffer.detached === void 0 && yt.buffer !== k.memory.buffer) && (yt = new DataView(k.memory.buffer)), yt;
}
function An(e, t) {
  return e = e >>> 0, Pr().subarray(e / 1, e / 1 + t);
}
function ll(e) {
  e < 132 || (Ze[e] = Dr, Dr = e);
}
function Wt(e) {
  const t = c(e);
  return ll(e), t;
}
function Qa(e) {
  const t = typeof e;
  if (t == "number" || t == "boolean" || e == null)
    return `${e}`;
  if (t == "string")
    return `"${e}"`;
  if (t == "symbol") {
    const a = e.description;
    return a == null ? "Symbol" : `Symbol(${a})`;
  }
  if (t == "function") {
    const a = e.name;
    return typeof a == "string" && a.length > 0 ? `Function(${a})` : "Function";
  }
  if (Array.isArray(e)) {
    const a = e.length;
    let s = "[";
    a > 0 && (s += Qa(e[0]));
    for (let i = 1; i < a; i++)
      s += ", " + Qa(e[i]);
    return s += "]", s;
  }
  const r = /\[object ([^\]]+)\]/.exec(toString.call(e));
  let n;
  if (r && r.length > 1)
    n = r[1];
  else
    return toString.call(e);
  if (n == "Object")
    try {
      return "Object(" + JSON.stringify(e) + ")";
    } catch {
      return "Object";
    }
  return e instanceof Error ? `${e.name}: ${e.message}
${e.stack}` : n;
}
let br = null;
function fl() {
  return (br === null || br.byteLength === 0) && (br = new Uint32Array(k.memory.buffer)), br;
}
function ul(e, t) {
  return e = e >>> 0, fl().subarray(e / 4, e / 4 + t);
}
let gr = null;
function dl() {
  return (gr === null || gr.byteLength === 0) && (gr = new Uint16Array(k.memory.buffer)), gr;
}
function hl(e, t) {
  return e = e >>> 0, dl().subarray(e / 2, e / 2 + t);
}
const Wo = typeof FinalizationRegistry > "u" ? {
  register: () => {
  }, unregister: () => {
  }
} : new FinalizationRegistry(
  (e) => {
    k.__wbindgen_export_4.get(e.dtor)(e.a, e.b);
  }
);
function pl(e, t, r, n) {
  const a = { a: e, b: t, cnt: 1, dtor: r }, s = (...i) => {
    a.cnt++;
    const l = a.a;
    a.a = 0;
    try {
      return n(l, a.b, ...i);
    } finally {
      --a.cnt === 0 ? (k.__wbindgen_export_4.get(a.dtor)(l, a.b), Wo.unregister(a)) : a.a = l;
    }
  };
  return s.original = a, Wo.register(s, a, a), s;
}
let wr = null;
function _l() {
  return (wr === null || wr.byteLength === 0) && (wr = new Int16Array(k.memory.buffer)), wr;
}
function bl(e, t) {
  return e = e >>> 0, _l().subarray(e / 2, e / 2 + t);
}
let yr = null;
function gl() {
  return (yr === null || yr.byteLength === 0) && (yr = new Int8Array(k.memory.buffer)), yr;
}
function wl(e, t) {
  return e = e >>> 0, gl().subarray(e / 1, e / 1 + t);
}
function yl(e, t, r) {
  k.__wbindgen_export_5(e, t, v(r));
}
function vl(e, t, r, n) {
  k.__wbindgen_export_6(e, t, v(r), v(n));
}
const ml = ["unknown", "destroyed"], kl = ["same-origin", "no-cors", "cors", "navigate"], Ko = typeof FinalizationRegistry > "u" ? {
  register: () => {
  }, unregister: () => {
  }
} : new FinalizationRegistry((e) => k.__wbg_devicelostpromise_free(e >>> 0, 1));
class Mr {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Mr.prototype);
    return r.__wbg_ptr = t, Ko.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ko.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    k.__wbg_devicelostpromise_free(t, 0);
  }
  /**
   * @returns {Promise<string>}
   */
  wait() {
    const t = this.__destroy_into_raw(), r = k.devicelostpromise_wait(t);
    return Wt(r);
  }
}
Symbol.dispose && (Mr.prototype[Symbol.dispose] = Mr.prototype.free);
const Go = typeof FinalizationRegistry > "u" ? {
  register: () => {
  }, unregister: () => {
  }
} : new FinalizationRegistry((e) => k.__wbg_engine_free(e >>> 0, 1));
class Et {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Et.prototype);
    return r.__wbg_ptr = t, Go.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Go.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    k.__wbg_engine_free(t, 0);
  }
  /**
   * @param {Float2} size
   * @param {Float2} pos
   * @returns {PixelReadPromise}
   */
  samplePixels(t, r) {
    const n = k.engine_samplePixels(this.__wbg_ptr, v(t), v(r));
    return Lr.__wrap(n);
  }
  /**
   * @param {ID} id
   */
  removeTexture(t) {
    k.engine_removeTexture(this.__wbg_ptr, v(t));
  }
  /**
   * @returns {DeviceLostPromise | undefined}
   */
  getDeviceLostPromise() {
    const t = k.engine_getDeviceLostPromise(this.__wbg_ptr);
    return t === 0 ? void 0 : Mr.__wrap(t);
  }
  /**
   * @param {DocumentData} document_data
   */
  reset(t) {
    k.engine_reset(this.__wbg_ptr, v(t));
  }
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {DocumentData} document_data
   * @param {boolean} try_webgpu
   * @returns {Promise<Engine>}
   */
  static create(t, r, n) {
    const a = k.engine_create(v(t), v(r), n);
    return Wt(a);
  }
  /**
   * @param {UInt2} logical_size
   * @param {number} scale_factor
   */
  resize(t, r) {
    k.engine_resize(this.__wbg_ptr, v(t), r);
  }
  /**
   * @param {number | null} [dt]
   */
  onFrame(t) {
    k.engine_onFrame(this.__wbg_ptr, !M(t), M(t) ? 0 : t);
  }
}
Symbol.dispose && (Et.prototype[Symbol.dispose] = Et.prototype.free);
const qo = typeof FinalizationRegistry > "u" ? {
  register: () => {
  }, unregister: () => {
  }
} : new FinalizationRegistry((e) => k.__wbg_pixelreadpromise_free(e >>> 0, 1));
class Lr {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Lr.prototype);
    return r.__wbg_ptr = t, qo.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, qo.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    k.__wbg_pixelreadpromise_free(t, 0);
  }
  /**
   * @returns {Promise<Uint8Array>}
   */
  wait() {
    const t = this.__destroy_into_raw(), r = k.pixelreadpromise_wait(t);
    return Wt(r);
  }
}
Symbol.dispose && (Lr.prototype[Symbol.dispose] = Lr.prototype.free);
const Sl = typeof FinalizationRegistry > "u" ? {
  register: () => {
  }, unregister: () => {
  }
} : new FinalizationRegistry((e) => k.__wbg_scenecontroller_free(e >>> 0, 1));
class Xa {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Sl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    k.__wbg_scenecontroller_free(t, 0);
  }
  /**
   * @param {string} key
   */
  onKeyDown(t) {
    const r = Ee(t, k.__wbindgen_export_2, k.__wbindgen_export_3), n = me;
    k.scenecontroller_onKeyDown(this.__wbg_ptr, r, n);
  }
  /**
   * @param {Float2} pos
   * @param {boolean} is_touch
   * @param {number} button
   */
  onPointerUp(t, r, n) {
    k.scenecontroller_onPointerUp(this.__wbg_ptr, v(t), r, n);
  }
  updateCached() {
    k.scenecontroller_updateCached(this.__wbg_ptr);
  }
  /**
   * @param {Float2} pos
   * @param {boolean} is_touch
   * @param {number} button
   */
  onPointerDown(t, r, n) {
    k.scenecontroller_onPointerDown(this.__wbg_ptr, v(t), r, n);
  }
  /**
   * @param {Float2} pos
   * @param {boolean} is_touch
   * @param {number} button
   */
  onPointerMove(t, r, n) {
    k.scenecontroller_onPointerMove(this.__wbg_ptr, v(t), r, n);
  }
  stopPresenting() {
    k.scenecontroller_stopPresenting(this.__wbg_ptr);
  }
  onPointerEnter() {
    k.scenecontroller_onPointerEnter(this.__wbg_ptr);
  }
  onPointerLeave() {
    k.scenecontroller_onPointerLeave(this.__wbg_ptr);
  }
  /**
   * @returns {boolean}
   */
  hasFontAssetsChanges() {
    return k.scenecontroller_hasFontAssetsChanges(this.__wbg_ptr) !== 0;
  }
  start() {
    k.scenecontroller_start(this.__wbg_ptr);
  }
  /**
   * @param {ID | null} [start_frame]
   * @param {boolean | null} [autoplay_videos]
   */
  present(t, r) {
    k.scenecontroller_present(this.__wbg_ptr, M(t) ? 0 : v(t), M(r) ? 16777215 : r ? 1 : 0);
  }
  /**
   * @param {string} key
   */
  onKeyUp(t) {
    const r = Ee(t, k.__wbindgen_export_2, k.__wbindgen_export_3), n = me;
    k.scenecontroller_onKeyUp(this.__wbg_ptr, r, n);
  }
  /**
   * @returns {boolean}
   */
  get is_play_mode() {
    return k.__wbg_get_scenecontroller_is_play_mode(this.__wbg_ptr) !== 0;
  }
  /**
   * @param {boolean} arg0
   */
  set is_play_mode(t) {
    k.__wbg_set_scenecontroller_is_play_mode(this.__wbg_ptr, t);
  }
  /**
   * @returns {boolean}
   */
  get show_pixel_grid() {
    return k.__wbg_get_scenecontroller_show_pixel_grid(this.__wbg_ptr) !== 0;
  }
  /**
   * @param {boolean} arg0
   */
  set show_pixel_grid(t) {
    k.__wbg_set_scenecontroller_show_pixel_grid(this.__wbg_ptr, t);
  }
  /**
   * @returns {boolean}
   */
  get needs_video_update() {
    return k.__wbg_get_scenecontroller_needs_video_update(this.__wbg_ptr) !== 0;
  }
  /**
   * @param {boolean} arg0
   */
  set needs_video_update(t) {
    k.__wbg_set_scenecontroller_needs_video_update(this.__wbg_ptr, t);
  }
}
Symbol.dispose && (Xa.prototype[Symbol.dispose] = Xa.prototype.free);
const Al = /* @__PURE__ */ new Set(["basic", "cors", "default"]);
async function xl(e, t) {
  if (typeof Response == "function" && e instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function")
      try {
        return await WebAssembly.instantiateStreaming(e, t);
      } catch (n) {
        if (e.ok && Al.has(e.type) && e.headers.get("Content-Type") !== "application/wasm")
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", n);
        else
          throw n;
      }
    const r = await e.arrayBuffer();
    return await WebAssembly.instantiate(r, t);
  } else {
    const r = await WebAssembly.instantiate(e, t);
    return r instanceof WebAssembly.Instance ? { instance: r, module: e } : r;
  }
}
function Ol() {
  const e = {};
  return e.wbg = {}, e.wbg.__wbg_activeTexture_6c1913c8d98b6134 = function (t, r) {
    c(t).activeTexture(r >>> 0);
  }, e.wbg.__wbg_activeTexture_fb07604497324f97 = function (t, r) {
    c(t).activeTexture(r >>> 0);
  }, e.wbg.__wbg_arrayBuffer_9c99b8e2809e8cbb = function () {
    return W(function (t) {
      const r = c(t).arrayBuffer();
      return v(r);
    }, arguments);
  }, e.wbg.__wbg_assign_b4068877cf3ed2f5 = function () {
    return W(function (t, r, n) {
      c(t).assign(ae(r, n));
    }, arguments);
  }, e.wbg.__wbg_attachShader_8bc6f118fa003360 = function (t, r, n) {
    c(t).attachShader(c(r), c(n));
  }, e.wbg.__wbg_attachShader_a8734551b2febdd9 = function (t, r, n) {
    c(t).attachShader(c(r), c(n));
  }, e.wbg.__wbg_bindBuffer_96956145e9aa4a24 = function (t, r, n) {
    c(t).bindBuffer(r >>> 0, c(n));
  }, e.wbg.__wbg_bindBuffer_ca632d407a6cd394 = function (t, r, n) {
    c(t).bindBuffer(r >>> 0, c(n));
  }, e.wbg.__wbg_bindFramebuffer_41001db5f1d804ef = function (t, r, n) {
    c(t).bindFramebuffer(r >>> 0, c(n));
  }, e.wbg.__wbg_bindFramebuffer_50be9cff3d87d51d = function (t, r, n) {
    c(t).bindFramebuffer(r >>> 0, c(n));
  }, e.wbg.__wbg_bindRenderbuffer_6884204d519b13d6 = function (t, r, n) {
    c(t).bindRenderbuffer(r >>> 0, c(n));
  }, e.wbg.__wbg_bindRenderbuffer_c50e2c1a1b2acdc2 = function (t, r, n) {
    c(t).bindRenderbuffer(r >>> 0, c(n));
  }, e.wbg.__wbg_bindTexture_344367fe0146db6b = function (t, r, n) {
    c(t).bindTexture(r >>> 0, c(n));
  }, e.wbg.__wbg_bindTexture_9d1255b2de6a3a20 = function (t, r, n) {
    c(t).bindTexture(r >>> 0, c(n));
  }, e.wbg.__wbg_bindVertexArrayOES_af3701d1c8765088 = function (t, r) {
    c(t).bindVertexArrayOES(c(r));
  }, e.wbg.__wbg_bindVertexArray_38371b6174c99865 = function (t, r) {
    c(t).bindVertexArray(c(r));
  }, e.wbg.__wbg_blendEquation_6e14efa7023bf8af = function (t, r) {
    c(t).blendEquation(r >>> 0);
  }, e.wbg.__wbg_blendEquation_dc7406d42c03ae57 = function (t, r) {
    c(t).blendEquation(r >>> 0);
  }, e.wbg.__wbg_blendFunc_2b57d1ac8595835b = function (t, r, n) {
    c(t).blendFunc(r >>> 0, n >>> 0);
  }, e.wbg.__wbg_blendFunc_53c2ed15a60e24a4 = function (t, r, n) {
    c(t).blendFunc(r >>> 0, n >>> 0);
  }, e.wbg.__wbg_blitFramebuffer_44e2ef9be85cf535 = function (t, r, n, a, s, i, l, f, p, g, y) {
    c(t).blitFramebuffer(r, n, a, s, i, l, f, p, g >>> 0, y >>> 0);
  }, e.wbg.__wbg_bufferData_07da60689dbe6a44 = function (t, r, n, a) {
    c(t).bufferData(r >>> 0, n, a >>> 0);
  }, e.wbg.__wbg_bufferData_711da55deac6c280 = function (t, r, n, a) {
    c(t).bufferData(r >>> 0, c(n), a >>> 0);
  }, e.wbg.__wbg_bufferData_8933d136e2eef38c = function (t, r, n, a) {
    c(t).bufferData(r >>> 0, n, a >>> 0);
  }, e.wbg.__wbg_bufferData_a964c14d0eebdeb8 = function (t, r, n, a) {
    c(t).bufferData(r >>> 0, c(n), a >>> 0);
  }, e.wbg.__wbg_bufferSubData_5d5f63356641a300 = function (t, r, n, a) {
    c(t).bufferSubData(r >>> 0, n, c(a));
  }, e.wbg.__wbg_bufferSubData_f896965b665058d2 = function (t, r, n, a) {
    c(t).bufferSubData(r >>> 0, n, c(a));
  }, e.wbg.__wbg_call_13410aac570ffff7 = function () {
    return W(function (t, r) {
      const n = c(t).call(c(r));
      return v(n);
    }, arguments);
  }, e.wbg.__wbg_call_a5400b25a865cfd8 = function () {
    return W(function (t, r, n) {
      const a = c(t).call(c(r), c(n));
      return v(a);
    }, arguments);
  }, e.wbg.__wbg_clearBufferfv_58492c55be047066 = function (t, r, n, a, s) {
    c(t).clearBufferfv(r >>> 0, n, Oe(a, s));
  }, e.wbg.__wbg_clearBufferiv_04bd46215e35a394 = function (t, r, n, a, s) {
    c(t).clearBufferiv(r >>> 0, n, Ho(a, s));
  }, e.wbg.__wbg_compileShader_3ed42f9f82c060ea = function (t, r) {
    c(t).compileShader(c(r));
  }, e.wbg.__wbg_compileShader_624cab4335331bc6 = function (t, r) {
    c(t).compileShader(c(r));
  }, e.wbg.__wbg_copyBufferSubData_5d8a2038b5d8badc = function (t, r, n, a, s, i) {
    c(t).copyBufferSubData(r >>> 0, n >>> 0, a, s, i);
  }, e.wbg.__wbg_createBuffer_6a92125855922b2e = function (t) {
    const r = c(t).createBuffer();
    return M(r) ? 0 : v(r);
  }, e.wbg.__wbg_createBuffer_c5ec555dacde83aa = function (t) {
    const r = c(t).createBuffer();
    return M(r) ? 0 : v(r);
  }, e.wbg.__wbg_createFramebuffer_4bc5f540c042ed80 = function (t) {
    const r = c(t).createFramebuffer();
    return M(r) ? 0 : v(r);
  }, e.wbg.__wbg_createFramebuffer_7f37b6fa900dcc83 = function (t) {
    const r = c(t).createFramebuffer();
    return M(r) ? 0 : v(r);
  }, e.wbg.__wbg_createProgram_905f3efd8354e76c = function (t) {
    const r = c(t).createProgram();
    return M(r) ? 0 : v(r);
  }, e.wbg.__wbg_createProgram_ec729a857b19d91d = function (t) {
    const r = c(t).createProgram();
    return M(r) ? 0 : v(r);
  }, e.wbg.__wbg_createRenderbuffer_2e49517573c90672 = function (t) {
    const r = c(t).createRenderbuffer();
    return M(r) ? 0 : v(r);
  }, e.wbg.__wbg_createRenderbuffer_fb1304cc58893f7f = function (t) {
    const r = c(t).createRenderbuffer();
    return M(r) ? 0 : v(r);
  }, e.wbg.__wbg_createShader_8548d722c1327303 = function (t, r) {
    const n = c(t).createShader(r >>> 0);
    return M(n) ? 0 : v(n);
  }, e.wbg.__wbg_createShader_fd0b69b640e9618d = function (t, r) {
    const n = c(t).createShader(r >>> 0);
    return M(n) ? 0 : v(n);
  }, e.wbg.__wbg_createTexture_5fd5f5e64ea927f9 = function (t) {
    const r = c(t).createTexture();
    return M(r) ? 0 : v(r);
  }, e.wbg.__wbg_createTexture_62494769edc22521 = function (t) {
    const r = c(t).createTexture();
    return M(r) ? 0 : v(r);
  }, e.wbg.__wbg_createVertexArrayOES_21ff1ae54f601a66 = function (t) {
    const r = c(t).createVertexArrayOES();
    return M(r) ? 0 : v(r);
  }, e.wbg.__wbg_createVertexArray_54f6bb34c6bf6a01 = function (t) {
    const r = c(t).createVertexArray();
    return M(r) ? 0 : v(r);
  }, e.wbg.__wbg_debug_c906769d2f88c17b = function (t) {
    console.debug(c(t));
  }, e.wbg.__wbg_deleteBuffer_2bf895dbf2712b1c = function (t, r) {
    c(t).deleteBuffer(c(r));
  }, e.wbg.__wbg_deleteBuffer_85973edb45946d28 = function (t, r) {
    c(t).deleteBuffer(c(r));
  }, e.wbg.__wbg_deleteFramebuffer_98d173a2f5729605 = function (t, r) {
    c(t).deleteFramebuffer(c(r));
  }, e.wbg.__wbg_deleteFramebuffer_f7980e4d44e3be49 = function (t, r) {
    c(t).deleteFramebuffer(c(r));
  }, e.wbg.__wbg_deleteProgram_38897a0794ccf3e7 = function (t, r) {
    c(t).deleteProgram(c(r));
  }, e.wbg.__wbg_deleteProgram_aea3ac7223133383 = function (t, r) {
    c(t).deleteProgram(c(r));
  }, e.wbg.__wbg_deleteRenderbuffer_c373f86e30a5b1db = function (t, r) {
    c(t).deleteRenderbuffer(c(r));
  }, e.wbg.__wbg_deleteRenderbuffer_fd93f50d76e1f7b3 = function (t, r) {
    c(t).deleteRenderbuffer(c(r));
  }, e.wbg.__wbg_deleteShader_d6e382690559bdd2 = function (t, r) {
    c(t).deleteShader(c(r));
  }, e.wbg.__wbg_deleteShader_eb2cdf8ac72c5b0c = function (t, r) {
    c(t).deleteShader(c(r));
  }, e.wbg.__wbg_deleteTexture_016238d3d7033a57 = function (t, r) {
    c(t).deleteTexture(c(r));
  }, e.wbg.__wbg_deleteTexture_38b1bb66607dcf07 = function (t, r) {
    c(t).deleteTexture(c(r));
  }, e.wbg.__wbg_deleteVertexArrayOES_1b404c452d2a2ca4 = function (t, r) {
    c(t).deleteVertexArrayOES(c(r));
  }, e.wbg.__wbg_deleteVertexArray_2f45b50ed3534f1f = function (t, r) {
    c(t).deleteVertexArray(c(r));
  }, e.wbg.__wbg_disable_21c6577232ad9696 = function (t, r) {
    c(t).disable(r >>> 0);
  }, e.wbg.__wbg_disable_8a09d5dbbf79acd8 = function (t, r) {
    c(t).disable(r >>> 0);
  }, e.wbg.__wbg_document_7d29d139bd619045 = function (t) {
    const r = c(t).document;
    return M(r) ? 0 : v(r);
  }, e.wbg.__wbg_drawArrays_55353be689b7c9a2 = function (t, r, n, a) {
    c(t).drawArrays(r >>> 0, n, a);
  }, e.wbg.__wbg_drawArrays_a302a553321cfecb = function (t, r, n, a) {
    c(t).drawArrays(r >>> 0, n, a);
  }, e.wbg.__wbg_drawElements_31332dbb833d202b = function (t, r, n, a, s) {
    c(t).drawElements(r >>> 0, n, a >>> 0, s);
  }, e.wbg.__wbg_drawElements_3acf8f6523f00d29 = function (t, r, n, a, s) {
    c(t).drawElements(r >>> 0, n, a >>> 0, s);
  }, e.wbg.__wbg_enableVertexAttribArray_0f7f10c9dbc31dfd = function (t, r) {
    c(t).enableVertexAttribArray(r >>> 0);
  }, e.wbg.__wbg_enableVertexAttribArray_17e09202dc56b410 = function (t, r) {
    c(t).enableVertexAttribArray(r >>> 0);
  }, e.wbg.__wbg_enable_043862f86449bfd3 = function (t, r) {
    c(t).enable(r >>> 0);
  }, e.wbg.__wbg_enable_d2b20d4e604e4ada = function (t, r) {
    c(t).enable(r >>> 0);
  }, e.wbg.__wbg_engine_new = function (t) {
    const r = Et.__wrap(t);
    return v(r);
  }, e.wbg.__wbg_error_7534b8e9a36f1ab4 = function (t, r) {
    let n, a;
    try {
      n = t, a = r, console.error(ae(t, r));
    } finally {
      k.__wbindgen_export_1(n, a, 1);
    }
  }, e.wbg.__wbg_error_99981e16d476aa5c = function (t) {
    console.error(c(t));
  }, e.wbg.__wbg_fetch_44b6058021aef5e3 = function (t, r) {
    const n = c(t).fetch(c(r));
    return v(n);
  }, e.wbg.__wbg_framebufferRenderbuffer_45178c04e8a4b3d9 = function (t, r, n, a, s) {
    c(t).framebufferRenderbuffer(r >>> 0, n >>> 0, a >>> 0, c(s));
  }, e.wbg.__wbg_framebufferRenderbuffer_ad5f82c1a05a92fb = function (t, r, n, a, s) {
    c(t).framebufferRenderbuffer(r >>> 0, n >>> 0, a >>> 0, c(s));
  }, e.wbg.__wbg_framebufferTexture2D_092bd9e2e1345ceb = function (t, r, n, a, s, i) {
    c(t).framebufferTexture2D(r >>> 0, n >>> 0, a >>> 0, c(s), i);
  }, e.wbg.__wbg_framebufferTexture2D_fb4babc49cc94fd6 = function (t, r, n, a, s, i) {
    c(t).framebufferTexture2D(r >>> 0, n >>> 0, a >>> 0, c(s), i);
  }, e.wbg.__wbg_from_88bc52ce20ba6318 = function (t) {
    const r = Array.from(c(t));
    return v(r);
  }, e.wbg.__wbg_generateMipmap_8ae9c57507b5c814 = function (t, r) {
    c(t).generateMipmap(r >>> 0);
  }, e.wbg.__wbg_generateMipmap_d9540bec7e200b2e = function (t, r) {
    c(t).generateMipmap(r >>> 0);
  }, e.wbg.__wbg_getActiveUniform_4fd679c899ae3dc0 = function (t, r, n) {
    const a = c(t).getActiveUniform(c(r), n >>> 0);
    return M(a) ? 0 : v(a);
  }, e.wbg.__wbg_getActiveUniform_ce415ea88da673f4 = function (t, r, n) {
    const a = c(t).getActiveUniform(c(r), n >>> 0);
    return M(a) ? 0 : v(a);
  }, e.wbg.__wbg_getContext_4bfd08c32570ece4 = function () {
    return W(function (t, r, n, a) {
      const s = c(t).getContext(ae(r, n), c(a));
      return M(s) ? 0 : v(s);
    }, arguments);
  }, e.wbg.__wbg_getExtension_bfad55fb92b4a6f1 = function () {
    return W(function (t, r, n) {
      const a = c(t).getExtension(ae(r, n));
      return M(a) ? 0 : v(a);
    }, arguments);
  }, e.wbg.__wbg_getParameter_2e3a45595197590c = function () {
    return W(function (t, r) {
      const n = c(t).getParameter(r >>> 0);
      return v(n);
    }, arguments);
  }, e.wbg.__wbg_getParameter_3624d89739a2bc7e = function () {
    return W(function (t, r) {
      const n = c(t).getParameter(r >>> 0);
      return v(n);
    }, arguments);
  }, e.wbg.__wbg_getProgramInfoLog_0f2cbb1decc2bdb4 = function (t, r, n) {
    const a = c(r).getProgramInfoLog(c(n));
    var s = M(a) ? 0 : Ee(a, k.__wbindgen_export_2, k.__wbindgen_export_3), i = me;
    te().setInt32(t + 4 * 1, i, !0), te().setInt32(t + 4 * 0, s, !0);
  }, e.wbg.__wbg_getProgramInfoLog_213b7a355f7a9ab3 = function (t, r, n) {
    const a = c(r).getProgramInfoLog(c(n));
    var s = M(a) ? 0 : Ee(a, k.__wbindgen_export_2, k.__wbindgen_export_3), i = me;
    te().setInt32(t + 4 * 1, i, !0), te().setInt32(t + 4 * 0, s, !0);
  }, e.wbg.__wbg_getProgramParameter_1dfaf593c91d28d4 = function (t, r, n) {
    const a = c(t).getProgramParameter(c(r), n >>> 0);
    return v(a);
  }, e.wbg.__wbg_getProgramParameter_fbfb133d8f8e5a0e = function (t, r, n) {
    const a = c(t).getProgramParameter(c(r), n >>> 0);
    return v(a);
  }, e.wbg.__wbg_getRandomValues_0fd9e2d73ca5f48f = function () {
    return W(function (t, r) {
      globalThis.crypto.getRandomValues(An(t, r));
    }, arguments);
  }, e.wbg.__wbg_getShaderInfoLog_42f0460a19309f2b = function (t, r, n) {
    const a = c(r).getShaderInfoLog(c(n));
    var s = M(a) ? 0 : Ee(a, k.__wbindgen_export_2, k.__wbindgen_export_3), i = me;
    te().setInt32(t + 4 * 1, i, !0), te().setInt32(t + 4 * 0, s, !0);
  }, e.wbg.__wbg_getShaderInfoLog_561bdd629638c1af = function (t, r, n) {
    const a = c(r).getShaderInfoLog(c(n));
    var s = M(a) ? 0 : Ee(a, k.__wbindgen_export_2, k.__wbindgen_export_3), i = me;
    te().setInt32(t + 4 * 1, i, !0), te().setInt32(t + 4 * 0, s, !0);
  }, e.wbg.__wbg_getShaderParameter_17cf070915068143 = function (t, r, n) {
    const a = c(t).getShaderParameter(c(r), n >>> 0);
    return v(a);
  }, e.wbg.__wbg_getShaderParameter_c213f6b6c9743c02 = function (t, r, n) {
    const a = c(t).getShaderParameter(c(r), n >>> 0);
    return v(a);
  }, e.wbg.__wbg_getSupportedExtensions_5a90a17f0f82d0b5 = function (t) {
    const r = c(t).getSupportedExtensions();
    return M(r) ? 0 : v(r);
  }, e.wbg.__wbg_getUniformLocation_2806716283530fdf = function (t, r, n, a) {
    const s = c(t).getUniformLocation(c(r), ae(n, a));
    return M(s) ? 0 : v(s);
  }, e.wbg.__wbg_getUniformLocation_3c1cc7519f10e1e9 = function (t, r, n, a) {
    const s = c(t).getUniformLocation(c(r), ae(n, a));
    return M(s) ? 0 : v(s);
  }, e.wbg.__wbg_get_0da715ceaecea5c8 = function (t, r) {
    const n = c(t)[r >>> 0];
    return v(n);
  }, e.wbg.__wbg_getwithrefkey_66a3a8f9cb365e04 = function (t, r) {
    const n = c(t)[c(r)];
    return v(n);
  }, e.wbg.__wbg_has_b89e451f638123e3 = function () {
    return W(function (t, r) {
      return Reflect.has(c(t), c(r));
    }, arguments);
  }, e.wbg.__wbg_height_b82a9c99cf91ca67 = function (t) {
    return c(t).height;
  }, e.wbg.__wbg_info_6cf68c1a86a92f6a = function (t) {
    console.info(c(t));
  }, e.wbg.__wbg_innerHeight_eacbddff807274db = function () {
    return W(function (t) {
      const r = c(t).innerHeight;
      return v(r);
    }, arguments);
  }, e.wbg.__wbg_innerWidth_dd42bfe6b5e91e59 = function () {
    return W(function (t) {
      const r = c(t).innerWidth;
      return v(r);
    }, arguments);
  }, e.wbg.__wbg_instanceof_GpuDeviceLostInfo_d07227c7621bedb8 = function (t) {
    let r;
    try {
      r = c(t) instanceof GPUDeviceLostInfo;
    } catch {
      r = !1;
    }
    return r;
  }, e.wbg.__wbg_instanceof_HtmlVideoElement_8f6ac5ffe765eb20 = function (t) {
    let r;
    try {
      r = c(t) instanceof HTMLVideoElement;
    } catch {
      r = !1;
    }
    return r;
  }, e.wbg.__wbg_instanceof_ImageBitmap_e82e6a629ec3d3e8 = function (t) {
    let r;
    try {
      r = c(t) instanceof ImageBitmap;
    } catch {
      r = !1;
    }
    return r;
  }, e.wbg.__wbg_instanceof_Response_50fde2cd696850bf = function (t) {
    let r;
    try {
      r = c(t) instanceof Response;
    } catch {
      r = !1;
    }
    return r;
  }, e.wbg.__wbg_instanceof_Uint8Array_9a8378d955933db7 = function (t) {
    let r;
    try {
      r = c(t) instanceof Uint8Array;
    } catch {
      r = !1;
    }
    return r;
  }, e.wbg.__wbg_instanceof_WebGl2RenderingContext_0437ff340aef5ac7 = function (t) {
    let r;
    try {
      r = c(t) instanceof WebGL2RenderingContext;
    } catch {
      r = !1;
    }
    return r;
  }, e.wbg.__wbg_instanceof_Window_12d20d558ef92592 = function (t) {
    let r;
    try {
      r = c(t) instanceof Window;
    } catch {
      r = !1;
    }
    return r;
  }, e.wbg.__wbg_invalidateFramebuffer_252b1811d7f3ad1b = function () {
    return W(function (t, r, n) {
      c(t).invalidateFramebuffer(r >>> 0, c(n));
    }, arguments);
  }, e.wbg.__wbg_length_186546c51cd61acd = function (t) {
    return c(t).length;
  }, e.wbg.__wbg_length_6bb7e81f9d7713e4 = function (t) {
    return c(t).length;
  }, e.wbg.__wbg_linkProgram_4bf446d2d081aa07 = function (t, r) {
    c(t).linkProgram(c(r));
  }, e.wbg.__wbg_linkProgram_95ebc1476a7a1a7b = function (t, r) {
    c(t).linkProgram(c(r));
  }, e.wbg.__wbg_loadImageFromBytes_71f8ead60be139bf = function (t) {
    const r = tl(Wt(t));
    return v(r);
  }, e.wbg.__wbg_loadImageFromUrl_761ff3b8c3f8c738 = function (t, r) {
    let n, a;
    try {
      n = t, a = r;
      const s = rl(ae(t, r));
      return v(s);
    } finally {
      k.__wbindgen_export_1(n, a, 1);
    }
  }, e.wbg.__wbg_loadVideoFromBytes_394f5572961a1466 = function (t) {
    const r = nl(Wt(t));
    return v(r);
  }, e.wbg.__wbg_loadVideoFromUrl_4522eb450b943471 = function (t, r) {
    let n, a;
    try {
      n = t, a = r;
      const s = al(ae(t, r));
      return v(s);
    } finally {
      k.__wbindgen_export_1(n, a, 1);
    }
  }, e.wbg.__wbg_location_92d89c32ae076cab = function (t) {
    const r = c(t).location;
    return v(r);
  }, e.wbg.__wbg_log_6c7b5f4f00b8ce3f = function (t) {
    console.log(c(t));
  }, e.wbg.__wbg_lost_494e98e7ee6d8da8 = function (t) {
    const r = c(t).lost;
    return v(r);
  }, e.wbg.__wbg_message_b173dc74ecacb5d2 = function (t, r) {
    const n = c(r).message, a = Ee(n, k.__wbindgen_export_2, k.__wbindgen_export_3), s = me;
    te().setInt32(t + 4 * 1, s, !0), te().setInt32(t + 4 * 0, a, !0);
  }, e.wbg.__wbg_name_9be6ea952975e526 = function (t, r) {
    const n = c(r).name, a = Ee(n, k.__wbindgen_export_2, k.__wbindgen_export_3), s = me;
    te().setInt32(t + 4 * 1, s, !0), te().setInt32(t + 4 * 0, a, !0);
  }, e.wbg.__wbg_navigator_65d5ad763926b868 = function (t) {
    const r = c(t).navigator;
    return v(r);
  }, e.wbg.__wbg_new_19c25a3f2fa63a02 = function () {
    const t = new Object();
    return v(t);
  }, e.wbg.__wbg_new_1f3a344cf3123716 = function () {
    const t = new Array();
    return v(t);
  }, e.wbg.__wbg_new_2e3c58a15f39f5f9 = function (t, r) {
    try {
      var n = { a: t, b: r }, a = (i, l) => {
        const f = n.a;
        n.a = 0;
        try {
          return vl(f, n.b, i, l);
        } finally {
          n.a = f;
        }
      };
      const s = new Promise(a);
      return v(s);
    } finally {
      n.a = n.b = 0;
    }
  }, e.wbg.__wbg_new_638ebfaedbf32a5e = function (t) {
    const r = new Uint8Array(c(t));
    return v(r);
  }, e.wbg.__wbg_new_8a6f238a6ece86ea = function () {
    const t = new Error();
    return v(t);
  }, e.wbg.__wbg_newnoargs_254190557c45b4ec = function (t, r) {
    const n = new Function(ae(t, r));
    return v(n);
  }, e.wbg.__wbg_newwithstrandinit_b5d168a29a3fd85f = function () {
    return W(function (t, r, n) {
      const a = new Request(ae(t, r), c(n));
      return v(a);
    }, arguments);
  }, e.wbg.__wbg_now_886b39d7ec380719 = function (t) {
    return c(t).now();
  }, e.wbg.__wbg_ok_2eac216b65d90573 = function (t) {
    return c(t).ok;
  }, e.wbg.__wbg_open_f3686f2ef2cc8b70 = function () {
    return W(function (t, r, n, a, s) {
      const i = c(t).open(ae(r, n), ae(a, s));
      return M(i) ? 0 : v(i);
    }, arguments);
  }, e.wbg.__wbg_open_fbf9d84c3371fb48 = function () {
    return W(function (t, r, n, a, s, i, l) {
      const f = c(t).open(ae(r, n), ae(a, s), ae(i, l));
      return M(f) ? 0 : v(f);
    }, arguments);
  }, e.wbg.__wbg_ownKeys_36e096e00ffe2676 = function () {
    return W(function (t) {
      const r = Reflect.ownKeys(c(t));
      return v(r);
    }, arguments);
  }, e.wbg.__wbg_pause_0c720b5cc1e9f317 = function () {
    return W(function (t) {
      c(t).pause();
    }, arguments);
  }, e.wbg.__wbg_performance_a221af8decc752fb = function (t) {
    const r = c(t).performance;
    return M(r) ? 0 : v(r);
  }, e.wbg.__wbg_pixelStorei_a5469272ba5f21a9 = function (t, r, n) {
    c(t).pixelStorei(r >>> 0, n);
  }, e.wbg.__wbg_pixelStorei_e3860b193984af5d = function (t, r, n) {
    c(t).pixelStorei(r >>> 0, n);
  }, e.wbg.__wbg_play_823d308ff5126fc6 = function () {
    return W(function (t) {
      const r = c(t).play();
      return v(r);
    }, arguments);
  }, e.wbg.__wbg_prototypesetcall_3d4a26c1ed734349 = function (t, r, n) {
    Uint8Array.prototype.set.call(An(t, r), c(n));
  }, e.wbg.__wbg_provokingVertexWEBGL_215dc56a43a52283 = function (t, r) {
    c(t).provokingVertexWEBGL(r >>> 0);
  }, e.wbg.__wbg_push_330b2eb93e4e1212 = function (t, r) {
    return c(t).push(c(r));
  }, e.wbg.__wbg_queueMicrotask_25d0739ac89e8c88 = function (t) {
    queueMicrotask(c(t));
  }, e.wbg.__wbg_queueMicrotask_4488407636f5bf24 = function (t) {
    const r = c(t).queueMicrotask;
    return v(r);
  }, e.wbg.__wbg_readBuffer_c43cb4b829fc3567 = function (t, r) {
    c(t).readBuffer(r >>> 0);
  }, e.wbg.__wbg_readPixels_8f50625896c2de94 = function () {
    return W(function (t, r, n, a, s, i, l, f) {
      c(t).readPixels(r, n, a, s, i >>> 0, l >>> 0, c(f));
    }, arguments);
  }, e.wbg.__wbg_readPixels_94d302036298e2a0 = function () {
    return W(function (t, r, n, a, s, i, l, f) {
      c(t).readPixels(r, n, a, s, i >>> 0, l >>> 0, c(f));
    }, arguments);
  }, e.wbg.__wbg_readPixels_f4f1bbd546ca2f58 = function () {
    return W(function (t, r, n, a, s, i, l, f) {
      c(t).readPixels(r, n, a, s, i >>> 0, l >>> 0, f);
    }, arguments);
  }, e.wbg.__wbg_reason_70f510afd8774d84 = function (t) {
    const r = c(t).reason;
    return (ml.indexOf(r) + 1 || 3) - 1;
  }, e.wbg.__wbg_renderbufferStorageMultisample_5c3fe8eb3c382231 = function (t, r, n, a, s, i) {
    c(t).renderbufferStorageMultisample(r >>> 0, n, a >>> 0, s, i);
  }, e.wbg.__wbg_renderbufferStorage_c10e5473e6397a0f = function (t, r, n, a, s) {
    c(t).renderbufferStorage(r >>> 0, n >>> 0, a, s);
  }, e.wbg.__wbg_renderbufferStorage_c2ec05cd4cb3ea68 = function (t, r, n, a, s) {
    c(t).renderbufferStorage(r >>> 0, n >>> 0, a, s);
  }, e.wbg.__wbg_resolve_4055c623acdd6a1b = function (t) {
    const r = Promise.resolve(c(t));
    return v(r);
  }, e.wbg.__wbg_set_453345bcda80b89a = function () {
    return W(function (t, r, n) {
      return Reflect.set(c(t), c(r), c(n));
    }, arguments);
  }, e.wbg.__wbg_setcurrentTime_7de4cb2f7b424266 = function (t, r) {
    c(t).currentTime = r;
  }, e.wbg.__wbg_setloop_6d26ccb428f2ec1f = function (t, r) {
    c(t).loop = r !== 0;
  }, e.wbg.__wbg_setmethod_9b504d5b855b329c = function (t, r, n) {
    c(t).method = ae(r, n);
  }, e.wbg.__wbg_setmode_a23e1a2ad8b512f8 = function (t, r) {
    c(t).mode = kl[r];
  }, e.wbg.__wbg_setmuted_67689fa2659ab80e = function (t, r) {
    c(t).muted = r !== 0;
  }, e.wbg.__wbg_setvolume_dc8632b43cbe259b = function (t, r) {
    c(t).volume = r;
  }, e.wbg.__wbg_shaderSource_261d7c2a863b3760 = function (t, r, n, a) {
    c(t).shaderSource(c(r), ae(n, a));
  }, e.wbg.__wbg_shaderSource_2ed8147ed144f6d6 = function (t, r, n, a) {
    c(t).shaderSource(c(r), ae(n, a));
  }, e.wbg.__wbg_size_88ea058cabfda9dc = function (t) {
    return c(t).size;
  }, e.wbg.__wbg_stack_0ed75d68575b0f3c = function (t, r) {
    const n = c(r).stack, a = Ee(n, k.__wbindgen_export_2, k.__wbindgen_export_3), s = me;
    te().setInt32(t + 4 * 1, s, !0), te().setInt32(t + 4 * 0, a, !0);
  }, e.wbg.__wbg_static_accessor_GLOBAL_8921f820c2ce3f12 = function () {
    const t = typeof global > "u" ? null : global;
    return M(t) ? 0 : v(t);
  }, e.wbg.__wbg_static_accessor_GLOBAL_THIS_f0a4409105898184 = function () {
    const t = typeof globalThis > "u" ? null : globalThis;
    return M(t) ? 0 : v(t);
  }, e.wbg.__wbg_static_accessor_SELF_995b214ae681ff99 = function () {
    const t = typeof self > "u" ? null : self;
    return M(t) ? 0 : v(t);
  }, e.wbg.__wbg_static_accessor_WINDOW_cde3890479c675ea = function () {
    const t = typeof window > "u" ? null : window;
    return M(t) ? 0 : v(t);
  }, e.wbg.__wbg_stencilFunc_0babded843f12cc3 = function (t, r, n, a) {
    c(t).stencilFunc(r >>> 0, n, a >>> 0);
  }, e.wbg.__wbg_stencilFunc_0c9c7df1191c2de1 = function (t, r, n, a) {
    c(t).stencilFunc(r >>> 0, n, a >>> 0);
  }, e.wbg.__wbg_stencilOp_0bd3fc540f237b45 = function (t, r, n, a) {
    c(t).stencilOp(r >>> 0, n >>> 0, a >>> 0);
  }, e.wbg.__wbg_stencilOp_912e0b87dead3d02 = function (t, r, n, a) {
    c(t).stencilOp(r >>> 0, n >>> 0, a >>> 0);
  }, e.wbg.__wbg_texImage2D_170458df6b3f9d01 = function () {
    return W(function (t, r, n, a, s, i, l, f, p, g) {
      c(t).texImage2D(r >>> 0, n, a, s, i, l, f >>> 0, p >>> 0, g);
    }, arguments);
  }, e.wbg.__wbg_texImage2D_36bd9e4c9e331a66 = function () {
    return W(function (t, r, n, a, s, i, l) {
      c(t).texImage2D(r >>> 0, n, a, s >>> 0, i >>> 0, c(l));
    }, arguments);
  }, e.wbg.__wbg_texImage2D_82e4e2b78c9ba46d = function () {
    return W(function (t, r, n, a, s, i, l) {
      c(t).texImage2D(r >>> 0, n, a, s >>> 0, i >>> 0, c(l));
    }, arguments);
  }, e.wbg.__wbg_texImage2D_aa5d5fe2fabd14fd = function () {
    return W(function (t, r, n, a, s, i, l, f, p, g) {
      c(t).texImage2D(r >>> 0, n, a, s, i, l, f >>> 0, p >>> 0, c(g));
    }, arguments);
  }, e.wbg.__wbg_texImage2D_b4f8c0aea7bf6f3d = function () {
    return W(function (t, r, n, a, s, i, l) {
      c(t).texImage2D(r >>> 0, n, a, s >>> 0, i >>> 0, c(l));
    }, arguments);
  }, e.wbg.__wbg_texImage2D_e7b9ba3b4467b817 = function () {
    return W(function (t, r, n, a, s, i, l, f, p, g) {
      c(t).texImage2D(r >>> 0, n, a, s, i, l, f >>> 0, p >>> 0, c(g));
    }, arguments);
  }, e.wbg.__wbg_texImage2D_fdf8fdd79c1c0796 = function () {
    return W(function (t, r, n, a, s, i, l) {
      c(t).texImage2D(r >>> 0, n, a, s >>> 0, i >>> 0, c(l));
    }, arguments);
  }, e.wbg.__wbg_texParameteri_0be696f1f20558e8 = function (t, r, n, a) {
    c(t).texParameteri(r >>> 0, n >>> 0, a);
  }, e.wbg.__wbg_texParameteri_ebae520a31bfd243 = function (t, r, n, a) {
    c(t).texParameteri(r >>> 0, n >>> 0, a);
  }, e.wbg.__wbg_texStorage2D_9d1cf9ec10deb70c = function (t, r, n, a, s, i) {
    c(t).texStorage2D(r >>> 0, n, a >>> 0, s, i);
  }, e.wbg.__wbg_then_b33a773d723afa3e = function (t, r, n) {
    const a = c(t).then(c(r), c(n));
    return v(a);
  }, e.wbg.__wbg_then_e22500defe16819f = function (t, r) {
    const n = c(t).then(c(r));
    return v(n);
  }, e.wbg.__wbg_type_e68738e3b59a5d27 = function (t) {
    return c(t).type;
  }, e.wbg.__wbg_uniform1f_0a141bee125b351e = function (t, r, n) {
    c(t).uniform1f(c(r), n);
  }, e.wbg.__wbg_uniform1f_2c34303ea0f33761 = function (t, r, n) {
    c(t).uniform1f(c(r), n);
  }, e.wbg.__wbg_uniform1fv_37160110742d424e = function (t, r, n, a) {
    c(t).uniform1fv(c(r), Oe(n, a));
  }, e.wbg.__wbg_uniform1fv_c03019803d5e5aaf = function (t, r, n, a) {
    c(t).uniform1fv(c(r), Oe(n, a));
  }, e.wbg.__wbg_uniform1i_036dbf425ab4b115 = function (t, r, n) {
    c(t).uniform1i(c(r), n);
  }, e.wbg.__wbg_uniform1i_485c226709cdf6d1 = function (t, r, n) {
    c(t).uniform1i(c(r), n);
  }, e.wbg.__wbg_uniform2f_596fb754fb1e84b5 = function (t, r, n, a) {
    c(t).uniform2f(c(r), n, a);
  }, e.wbg.__wbg_uniform2f_78050f7ca285de9e = function (t, r, n, a) {
    c(t).uniform2f(c(r), n, a);
  }, e.wbg.__wbg_uniform2fv_37c597d61214c92e = function (t, r, n, a) {
    c(t).uniform2fv(c(r), Oe(n, a));
  }, e.wbg.__wbg_uniform2fv_48c3b1902f6c180b = function (t, r, n, a) {
    c(t).uniform2fv(c(r), Oe(n, a));
  }, e.wbg.__wbg_uniform2i_19aa96f9f9eaf891 = function (t, r, n, a) {
    c(t).uniform2i(c(r), n, a);
  }, e.wbg.__wbg_uniform2i_34aabb23c437a5c4 = function (t, r, n, a) {
    c(t).uniform2i(c(r), n, a);
  }, e.wbg.__wbg_uniform3f_16e5596ebd3b41a3 = function (t, r, n, a, s) {
    c(t).uniform3f(c(r), n, a, s);
  }, e.wbg.__wbg_uniform3f_6174ba6a42b33e9a = function (t, r, n, a, s) {
    c(t).uniform3f(c(r), n, a, s);
  }, e.wbg.__wbg_uniform4f_bdbc23e5bfc9627b = function (t, r, n, a, s, i) {
    c(t).uniform4f(c(r), n, a, s, i);
  }, e.wbg.__wbg_uniform4f_dbec95251e06b7c9 = function (t, r, n, a, s, i) {
    c(t).uniform4f(c(r), n, a, s, i);
  }, e.wbg.__wbg_uniformMatrix3fv_03248f168d1b8bc1 = function (t, r, n, a, s) {
    c(t).uniformMatrix3fv(c(r), n !== 0, Oe(a, s));
  }, e.wbg.__wbg_uniformMatrix3fv_4f2fd4d31f0cfae4 = function (t, r, n, a, s) {
    c(t).uniformMatrix3fv(c(r), n !== 0, Oe(a, s));
  }, e.wbg.__wbg_uniformMatrix3x2fv_68cf50c1109d6a7b = function (t, r, n, a, s) {
    c(t).uniformMatrix3x2fv(c(r), n !== 0, Oe(a, s));
  }, e.wbg.__wbg_uniformMatrix4fv_79313b9da7a4af35 = function (t, r, n, a, s) {
    c(t).uniformMatrix4fv(c(r), n !== 0, Oe(a, s));
  }, e.wbg.__wbg_uniformMatrix4fv_cefcf2bb4c08d391 = function (t, r, n, a, s) {
    c(t).uniformMatrix4fv(c(r), n !== 0, Oe(a, s));
  }, e.wbg.__wbg_uniformMatrix4x3fv_cae7d88742cd5e7e = function (t, r, n, a, s) {
    c(t).uniformMatrix4x3fv(c(r), n !== 0, Oe(a, s));
  }, e.wbg.__wbg_useProgram_3e5c220728446c29 = function (t, r) {
    c(t).useProgram(c(r));
  }, e.wbg.__wbg_useProgram_9392b29dd522e4ff = function (t, r) {
    c(t).useProgram(c(r));
  }, e.wbg.__wbg_userAgent_2e89808dc5dc17d7 = function () {
    return W(function (t, r) {
      const n = c(r).userAgent, a = Ee(n, k.__wbindgen_export_2, k.__wbindgen_export_3), s = me;
      te().setInt32(t + 4 * 1, s, !0), te().setInt32(t + 4 * 0, a, !0);
    }, arguments);
  }, e.wbg.__wbg_valueOf_f1ef20623c7bdd1c = function (t) {
    return c(t).valueOf();
  }, e.wbg.__wbg_vertexAttribIPointer_e7e0c1bbb4b1b356 = function (t, r, n, a, s, i) {
    c(t).vertexAttribIPointer(r >>> 0, n, a >>> 0, s, i);
  }, e.wbg.__wbg_vertexAttribPointer_3549d2703f29bf38 = function (t, r, n, a, s, i, l) {
    c(t).vertexAttribPointer(r >>> 0, n, a >>> 0, s !== 0, i, l);
  }, e.wbg.__wbg_vertexAttribPointer_a947e4bf88eef038 = function (t, r, n, a, s, i, l) {
    c(t).vertexAttribPointer(r >>> 0, n, a >>> 0, s !== 0, i, l);
  }, e.wbg.__wbg_viewport_08854654c5c2bba6 = function (t, r, n, a, s) {
    c(t).viewport(r, n, a, s);
  }, e.wbg.__wbg_viewport_fd16dca3a04df933 = function (t, r, n, a, s) {
    c(t).viewport(r, n, a, s);
  }, e.wbg.__wbg_warn_e2ada06313f92f09 = function (t) {
    console.warn(c(t));
  }, e.wbg.__wbg_wbindgenbooleanget_3fe6f642c7d97746 = function (t) {
    const r = c(t), n = typeof r == "boolean" ? r : void 0;
    return M(n) ? 16777215 : n ? 1 : 0;
  }, e.wbg.__wbg_wbindgencbdrop_eb10308566512b88 = function (t) {
    const r = c(t).original;
    return r.cnt-- == 1 ? (r.a = 0, !0) : !1;
  }, e.wbg.__wbg_wbindgendebugstring_99ef257a3ddda34d = function (t, r) {
    const n = Qa(c(r)), a = Ee(n, k.__wbindgen_export_2, k.__wbindgen_export_3), s = me;
    te().setInt32(t + 4 * 1, s, !0), te().setInt32(t + 4 * 0, a, !0);
  }, e.wbg.__wbg_wbindgenisfunction_8cee7dce3725ae74 = function (t) {
    return typeof c(t) == "function";
  }, e.wbg.__wbg_wbindgenisnull_f3037694abe4d97a = function (t) {
    return c(t) === null;
  }, e.wbg.__wbg_wbindgenisstring_d4fa939789f003b0 = function (t) {
    return typeof c(t) == "string";
  }, e.wbg.__wbg_wbindgenisundefined_c4b71d073b92f3c5 = function (t) {
    return c(t) === void 0;
  }, e.wbg.__wbg_wbindgennumberget_f74b4c7525ac05cb = function (t, r) {
    const n = c(r), a = typeof n == "number" ? n : void 0;
    te().setFloat64(t + 8 * 1, M(a) ? 0 : a, !0), te().setInt32(t + 4 * 0, !M(a), !0);
  }, e.wbg.__wbg_wbindgenstringget_0f16a6ddddef376f = function (t, r) {
    const n = c(r), a = typeof n == "string" ? n : void 0;
    var s = M(a) ? 0 : Ee(a, k.__wbindgen_export_2, k.__wbindgen_export_3), i = me;
    te().setInt32(t + 4 * 1, i, !0), te().setInt32(t + 4 * 0, s, !0);
  }, e.wbg.__wbg_wbindgenthrow_451ec1a8469d7eb6 = function (t, r) {
    throw new Error(ae(t, r));
  }, e.wbg.__wbg_width_b4f8204da82fc56d = function (t) {
    return c(t).width;
  }, e.wbg.__wbindgen_cast_2241b6af4c4b2941 = function (t, r) {
    const n = ae(t, r);
    return v(n);
  }, e.wbg.__wbindgen_cast_77bc3e92745e9a35 = function (t, r) {
    var n = An(t, r).slice();
    return k.__wbindgen_export_1(t, r * 1, 1), v(n);
  }, e.wbg.__wbindgen_cast_7c316abdc43840a3 = function (t, r) {
    const n = ul(t, r);
    return v(n);
  }, e.wbg.__wbindgen_cast_9575fb55a66c262b = function (t, r) {
    const n = Ho(t, r);
    return v(n);
  }, e.wbg.__wbindgen_cast_bbb4883c6389f1de = function (t, r) {
    const n = hl(t, r);
    return v(n);
  }, e.wbg.__wbindgen_cast_bfc4d2d12a815120 = function (t, r) {
    const n = pl(t, r, 315, yl);
    return v(n);
  }, e.wbg.__wbindgen_cast_cb9088102bce6b30 = function (t, r) {
    const n = An(t, r);
    return v(n);
  }, e.wbg.__wbindgen_cast_cd07b1914aa3d62c = function (t, r) {
    const n = Oe(t, r);
    return v(n);
  }, e.wbg.__wbindgen_cast_d6cd19b81560fd6e = function (t) {
    return v(t);
  }, e.wbg.__wbindgen_cast_e47ceb6027f5c92c = function (t, r) {
    const n = bl(t, r);
    return v(n);
  }, e.wbg.__wbindgen_cast_feefb5fadd6457fd = function (t, r) {
    const n = wl(t, r);
    return v(n);
  }, e.wbg.__wbindgen_object_clone_ref = function (t) {
    const r = c(t);
    return v(r);
  }, e.wbg.__wbindgen_object_drop_ref = function (t) {
    Wt(t);
  }, e;
}
function El(e, t) {
  return k = e.exports, Mi.__wbindgen_wasm_module = t, yt = null, pr = null, wr = null, _r = null, yr = null, gr = null, br = null, hr = null, k.__wbindgen_start(), k;
}
async function Mi(e) {
  if (k !== void 0) return k;
  typeof e < "u" && (Object.getPrototypeOf(e) === Object.prototype ? { module_or_path: e } = e : console.warn("using deprecated parameters for the initialization function; pass a single object instead")), typeof e > "u" && (e = new URL(
    /* @vite-ignore */
    "hana3d.wasm",
    import.meta.url
  ));
  const t = Ol();
  (typeof e == "string" || typeof Request == "function" && e instanceof Request || typeof URL == "function" && e instanceof URL) && (e = fetch(e));
  const { instance: r, module: n } = await xl(await e, t);
  return El(r, n);
}
function w(e) {
  let t = wn(e);
  if (typeof t != "object" || t === null)
    throw new Error("Expected object");
}
function o(e, t, r, n, a, s) {
  let i = a ? e : e[r], l = i;
  if (l === void 0) {
    if (t)
      return;
    if (s !== void 0)
      l = s;
    else
      throw new Error("Expected field " + r);
  }
  let f = n(l);
  f !== i && (a ? Object.assign(e, f) : e[r] = f);
}
function C(e, t, r) {
  let n = r(e);
  return n !== e && (n.type = t), n;
}
function We(e, t, r) {
  let n = e.value, a = r(n);
  return a !== wn(n) && (e.value = a), e;
}
function u(e) {
  if (typeof e != "number")
    throw new Error("Expected number");
  return e;
}
const St = u;
function Je(e) {
  if (typeof e != "number" || e % 1 !== 0)
    throw new Error("Expected integer");
  return e;
}
function se(e) {
  if (typeof e != "string")
    throw new Error("Expected string");
  return e;
}
function $(e) {
  if (typeof e != "boolean")
    throw new Error("Expected boolean");
  return e;
}
function zr(e) {
  return (t) => {
    if (!Array.isArray(wn(t)))
      throw new Error("Expected array");
    for (let r = 0; r < t.length; r++)
      e(t.at(r));
    return t;
  };
}
function vn(e, t) {
  return (r) => {
    let n = wn(r);
    if (!Array.isArray(n) || r.length !== t)
      throw new Error("Expected array");
    for (let a = 0; a < r.length; a++)
      e(r.at(a));
    return r;
  };
}
function V(e) {
  return (t) => (t !== null && e(t), t);
}
function Dl(e, t) {
  return (r) => {
    w(r);
    for (let n in r)
      e(n), t(r[n]);
    return r;
  };
}
const Li = (e) => e;
var I;
((e) => {
  e.check = vn(u, 2);
})(I || (I = {}));
var pe;
((e) => {
  e.check = vn(u, 3);
})(pe || (pe = {}));
var Dt;
((e) => {
  e.check = vn(u, 4);
  function t(r, n, a, s) {
    return [r, n, a, s];
  }
  e.new_ = t;
})(Dt || (Dt = {}));
var Zo;
((e) => {
  e.check = vn(u, 6);
})(Zo || (Zo = {}));
const Pl = (e) => {
  switch (w(e), e.type) {
    case "Url":
      return We(e, "Url", se), e;
    case "Local":
      return We(e, "Local", Nr.check), e;
    default:
      throw new Error("Invalid type for LegacyUrlOrPlatformUInt8Array");
  }
};
var es;
((e) => {
  e.check = Pl;
})(es || (es = {}));
const Il = pe.check;
var $e;
((e) => {
  e.check = Il;
})($e || ($e = {}));
const Cl = Dt.check;
var Se;
((e) => {
  e.check = Cl;
})(Se || (Se = {}));
const $l = (e) => (w(e), o(e, !1, "min", I.check, !1), o(e, !1, "max", I.check, !1), e);
var Nn;
((e) => {
  e.check = $l;
})(Nn || (Nn = {}));
var Fr = /* @__PURE__ */ ((e) => (e.x = "x", e.y = "y", e.z = "z", e))(Fr || {});
const Rl = [
  "x",
  "y",
  "z"
  /* z */
], Tl = (e) => {
  if (!Rl.includes(e))
    throw new Error("Invalid value for AxisData");
  return e;
};
((e) => {
  e.check = Tl;
})(Fr || (Fr = {}));
var ts = /* @__PURE__ */ ((e) => (e.x = "x", e.nx = "-x", e.y = "y", e.ny = "-y", e))(ts || {});
const Ul = [
  "x",
  "-x",
  "y",
  "-y"
  /* ny */
], jl = (e) => {
  if (!Ul.includes(e))
    throw new Error("Invalid value for DirectionalAxisData");
  return e;
};
((e) => {
  e.check = jl;
})(ts || (ts = {}));
var Vr = /* @__PURE__ */ ((e) => (e.Front = "Front", e.Back = "Back", e.Both = "Both", e))(Vr || {});
const Bl = [
  "Front",
  "Back",
  "Both"
  /* Both */
], Ml = (e) => {
  if (!Bl.includes(e))
    throw new Error("Invalid value for SideData");
  return e;
};
((e) => {
  e.check = Ml;
})(Vr || (Vr = {}));
((e) => {
  function t(r, n) {
    return [r, n];
  }
  e.new_ = t;
})(I || (I = {}));
((e) => {
  function t(r, n, a) {
    return [r, n, a];
  }
  e.new_ = t;
})(pe || (pe = {}));
var Nr;
((e) => {
  e.check = (t) => {
    if (!(t instanceof Uint8Array))
      throw new Error("Invalid value for UInt8Array");
    return t;
  };
})(Nr || (Nr = {}));
var rs;
((e) => {
  e.check = (t) => {
    if (!(t instanceof Uint8Array))
      throw new Error("Invalid value for PlatformUInt8Array");
    return t;
  };
})(rs || (rs = {}));
var Zt;
((e) => {
  function t(n) {
    return n instanceof Kt ? null : n;
  }
  e.externalToNull = t;
  function r(n) {
    if (typeof n == "string" || n instanceof Uint8Array || n instanceof Kt)
      return n;
    {
      const a = es.check(n);
      if (a.type === "Url" || a.type === "Local")
        return a.value;
      throw new Error("Invalid UrlOrPlatformUInt8Array");
    }
  }
  e.check = r;
})(Zt || (Zt = {}));
((e) => {
  e.union = (t) => t.reduce((r, n) => n ? r ? {
    min: [Math.min(r.min[0], n.min[0]), Math.min(r.min[1], n.min[1])],
    max: [Math.max(r.max[0], n.max[0]), Math.max(r.max[1], n.max[1])]
  } : n : r, null), e.translate = (t, r, n) => ({
    min: [t.min[0] + r, t.min[1] + n],
    max: [t.max[0] + r, t.max[1] + n]
  });
})(Nn || (Nn = {}));
var Yo;
((e) => {
  function t(n) {
    return (a) => typeof a == "string" ? a : n(a);
  }
  e.check = t;
  function r(n) {
    return n;
  }
  e.new_ = r;
})(Yo || (Yo = {}));
function Ll(e) {
  return (t) => (w(t), o(t, !1, "data", e, !1), o(t, !1, "fi", St, !1), o(t, !1, "id", K.check, !1), t);
}
var ns;
((e) => {
  e.check = Ll;
})(ns || (ns = {}));
function zi(e) {
  return zr(ns.check(e));
}
var Jo;
((e) => {
  e.check = zi;
})(Jo || (Jo = {}));
function zl(e) {
  return (t) => (w(t), o(t, !1, "data", e, !1), o(t, !1, "fi", St, !1), o(t, !1, "id", K.check, !1), o(t, !1, "children", Wn.check(e), !1), t);
}
var Hn;
((e) => {
  e.check = zl;
})(Hn || (Hn = {}));
function Fi(e) {
  return zr(Hn.check(e));
}
var Qo;
((e) => {
  e.check = Fi;
})(Qo || (Qo = {}));
function Fl(e) {
  return Dl(K.check, e);
}
var Xo;
((e) => {
  e.check = Fl;
})(Xo || (Xo = {}));
var K;
((e) => {
  function t(r) {
    if (typeof r != "string")
      throw new Error("Expected string");
    return r;
  }
  e.check = t;
})(K || (K = {}));
var Wn;
((e) => {
  function t(r) {
    return (n) => {
      if (n instanceof bn)
        n.traverse((a, s) => {
          r(s);
        });
      else {
        const a = Fi(r)(n);
        Object.setPrototypeOf(a, Be.prototype);
      }
      return n;
    };
  }
  e.check = t;
})(Wn || (Wn = {}));
var Q;
((e) => {
  function t(n) {
    return (a) => {
      w(a);
      for (const s in a)
        n(a[s]);
      if (wn(a) !== a) {
        if (Object.getPrototypeOf(a) !== ye.prototype)
          throw new Error("cannot set prototype");
      } else
        Object.getPrototypeOf(a) !== ye.prototype && Object.setPrototypeOf(a, ye.prototype);
      return a;
    };
  }
  e.check = t;
  function r() {
    return new ye();
  }
  e.new_ = r;
})(Q || (Q = {}));
var ve;
((e) => {
  function t(r) {
    return (n) => {
      if (n instanceof gn)
        n.forEach((a) => {
          r(a);
        });
      else {
        const a = zi(r)(n), s = new Ae(), i = /* @__PURE__ */ new Set();
        for (const l of a)
          i.has(l.id) || (i.add(l.id), s.push(l));
        return s;
      }
      return n;
    };
  }
  e.check = t;
})(ve || (ve = {}));
function Vl(e, t) {
  const r = {};
  for (const n in e)
    e[n] !== t[n] && (r[n] = t[n]);
  return r;
}
function Nl(e, t) {
  let r, n;
  for (const a in e)
    t.includes(a) ? (r === void 0 && (r = {}), r[a] = e[a]) : (n === void 0 && (n = {}), n[a] = e[a]);
  return [r, n];
}
function Hl(e) {
  for (const t of Object.keys(e))
    e[t] === void 0 && delete e[t];
  return e;
}
function Dn(e, t) {
  return Math.abs(e - t) < Number.EPSILON;
}
function mt(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let r = 0; r < e.length; r++)
    if (!Dn(e[r], t[r]))
      return !1;
  return !0;
}
function Vi(e, t = 0) {
  return e.map((r) => Wl(r, t));
}
function Wl(e, t = 0) {
  return typeof e == "string" || isFinite(e) ? e : t;
}
function _e(e, t) {
  if (!t)
    return e;
  let r = !1;
  const n = { ...e };
  for (const a in t) {
    const s = t[a];
    if (s === void 0) {
      console.warn("should not contain undefined value in replacement");
      continue;
    }
    n[a] !== void 0 && (r = !0, n[a] = s);
  }
  return r ? n : e;
}
function Ne(e, t, r) {
  if (!r)
    return e;
  const n = e[t];
  if (n == null)
    return e;
  const a = _e(n, r);
  return a === n ? e : { ...e, [t]: a };
}
function Kl(e, t, r, n) {
  if (!r)
    return e;
  const a = e[t];
  if (a == null)
    return e;
  const s = n(a, r);
  return s === a ? e : { ...e, [t]: s };
}
function kt(e, t, r) {
  if (!r)
    return e;
  const n = e[t];
  return n == null || n === r ? e : { ...e, [t]: r };
}
function Gl(e, t, r) {
  if (!t)
    return e;
  let n = !1;
  const a = e.map((s) => {
    const i = t[s.id];
    if (i === void 0)
      return s;
    const l = r(s.data, i);
    return s.data !== l ? (n = !0, { ...s, data: l }) : s;
  });
  return n ? (Object.setPrototypeOf(a, Ae.prototype), a) : e;
}
function Ni(e, t, r) {
  if (!t)
    return e;
  let n = !1;
  const a = {};
  return Object.entries(e).forEach((s) => {
    const [i, l] = s, f = t[i];
    f === void 0 && (a[i] = l);
    const p = r(l, f);
    l !== p ? (n = !0, a[i] = p) : a[i] = l;
  }), n ? (Object.setPrototypeOf(a, ye.prototype), a) : e;
}
function _t(e, t) {
  e.check = t;
}
const ql = (e) => (w(e), o(e, !1, "name", se, !1, ""), e);
function Zl() {
  return {
    name: ""
  };
}
var Yt;
((e) => {
  e.check = ql, e.defaultData = Zl;
})(Yt || (Yt = {}));
const Yl = (e) => {
  switch (w(e), e.type) {
    case "transition":
      return C(e, "transition", Hr.check);
    case "video":
      return C(e, "video", qr.check);
    case "link":
      return C(e, "link", Zr.check);
    case "show":
      return C(e, "show", Yr.check);
    default:
      throw new Error("Invalid type for ActionData");
  }
};
var Pt;
((e) => {
  e.check = Yl;
})(Pt || (Pt = {}));
var Kn = /* @__PURE__ */ ((e) => (e.once = "once", e.repeat = "repeat", e.toggle = "toggle", e))(Kn || {});
const Jl = [
  "once",
  "repeat",
  "toggle"
  /* toggle */
], Ql = (e) => {
  if (!Jl.includes(e))
    throw new Error("Invalid value for RunModeData");
  return e;
};
((e) => {
  e.check = Ql;
})(Kn || (Kn = {}));
const Xl = (e) => (w(e), o(e, !1, "base", Yt.check, !0), o(e, !1, "object", V(K.check), !1), o(e, !1, "tweens", ve.check(Wr.check), !1), o(e, !1, "runMode", Kn.check, !1), o(e, !1, "repeat", Je, !1), o(e, !1, "direction", Kr.check, !1), o(e, !1, "delay", u, !1), o(e, !1, "delayDirection", Gr.check, !1), e);
var Hr;
((e) => {
  e.check = Xl;
})(Hr || (Hr = {}));
const Hi = (e) => {
  switch (w(e), e.type) {
    case "current":
      return We(e, "current", Li), e;
    case "state":
      return We(e, "state", V(K.check)), e;
    default:
      throw new Error("Invalid type for TweenStateData");
  }
};
var Gn;
((e) => {
  e.check = Hi;
})(Gn || (Gn = {}));
const Wi = (e) => (w(e), o(e, !1, "state", Gn.check, !1), o(e, !1, "duration", u, !1), o(e, !1, "easing", qn.check, !1), o(e, !1, "repeat", Je, !1), o(e, !1, "direction", Kr.check, !1), o(e, !1, "delay", u, !1), o(e, !1, "delayDirection", Gr.check, !1), o(e, !1, "control1", V(I.check), !1), o(e, !1, "control2", V(I.check), !1), o(e, !1, "mass", V(St), !1), o(e, !1, "stiffness", V(St), !1), o(e, !1, "damping", V(St), !1), o(e, !1, "velocity", V(St), !1), e);
var Wr;
((e) => {
  e.check = Wi;
})(Wr || (Wr = {}));
var qn = /* @__PURE__ */ ((e) => (e[e.linear = 0] = "linear", e[e.ease = 1] = "ease", e[e.easeIn = 2] = "easeIn", e[e.easeOut = 3] = "easeOut", e[e.easeInOut = 4] = "easeInOut", e[e.bezier = 5] = "bezier", e[e.spring = 6] = "spring", e))(qn || {});
const ef = [
  0,
  1,
  2,
  3,
  4,
  5,
  6
  /* spring */
], tf = (e) => {
  if (!ef.includes(e))
    throw new Error("Invalid value for EasingData");
  return e;
};
((e) => {
  e.check = tf;
})(qn || (qn = {}));
var Kr = /* @__PURE__ */ ((e) => (e.normal = "normal", e.pingpong = "pingpong", e.pingpongRewind = "pingpongRewind", e))(Kr || {});
const rf = [
  "normal",
  "pingpong",
  "pingpongRewind"
  /* pingpongRewind */
], nf = (e) => {
  if (!rf.includes(e))
    throw new Error("Invalid value for RepeatDirectionData");
  return e;
};
((e) => {
  e.check = nf;
})(Kr || (Kr = {}));
var Gr = /* @__PURE__ */ ((e) => (e.startOnce = "startOnce", e.start = "start", e.end = "end", e.startEnd = "startEnd", e))(Gr || {});
const af = [
  "startOnce",
  "start",
  "end",
  "startEnd"
  /* startEnd */
], sf = (e) => {
  if (!af.includes(e))
    throw new Error("Invalid value for DelayDirectionData");
  return e;
};
((e) => {
  e.check = sf;
})(Gr || (Gr = {}));
const of = (e) => (w(e), o(e, !1, "base", Yt.check, !0), o(e, !1, "object", V(K.check), !1), o(e, !1, "layerId", V(K.check), !1), o(e, !1, "interaction", Zn.check, !1), o(e, !1, "triggerAfter", V(Yn.check), !1), o(e, !1, "delay", u, !1), o(e, !1, "toggle", V(Jn.check), !1), o(e, !1, "volume", u, !1), o(e, !1, "autoLoop", $, !1), e);
var qr;
((e) => {
  e.check = of;
})(qr || (qr = {}));
var Zn = /* @__PURE__ */ ((e) => (e.play = "play", e.pause = "pause", e.stop = "stop", e))(Zn || {});
const cf = [
  "play",
  "pause",
  "stop"
  /* stop */
], lf = (e) => {
  if (!cf.includes(e))
    throw new Error("Invalid value for VideoInteractionData");
  return e;
};
((e) => {
  e.check = lf;
})(Zn || (Zn = {}));
var Yn = /* @__PURE__ */ ((e) => (e.autoplay = "autoplay", e.any = "any", e.mouseDown = "mouseDown", e.keyDown = "keyDown", e))(Yn || {});
const ff = [
  "autoplay",
  "any",
  "mouseDown",
  "keyDown"
  /* keyDown */
], uf = (e) => {
  if (!ff.includes(e))
    throw new Error("Invalid value for TriggerAfterVideoType");
  return e;
};
((e) => {
  e.check = uf;
})(Yn || (Yn = {}));
var Jn = /* @__PURE__ */ ((e) => (e.none = "none", e.stop = "stop", e.pause = "pause", e))(Jn || {});
const df = [
  "none",
  "stop",
  "pause"
  /* pause */
], hf = (e) => {
  if (!df.includes(e))
    throw new Error("Invalid value for ToggleData");
  return e;
};
((e) => {
  e.check = hf;
})(Jn || (Jn = {}));
var Qn = /* @__PURE__ */ ((e) => (e.Current = "Current", e.Tab = "Tab", e.Window = "Window", e))(Qn || {});
const pf = [
  "Current",
  "Tab",
  "Window"
  /* Window */
], _f = (e) => {
  if (!pf.includes(e))
    throw new Error("Invalid value for LinkTargetData");
  return e;
};
((e) => {
  e.check = _f;
})(Qn || (Qn = {}));
const bf = (e) => (w(e), o(e, !1, "base", Yt.check, !0), o(e, !1, "url", se, !1, ""), o(
  e,
  !1,
  "target",
  Qn.check,
  !1,
  "Tab"
  /* Tab */
), e);
var Zr;
((e) => {
  e.check = bf;
})(Zr || (Zr = {}));
const gf = (e) => (w(e), o(e, !1, "base", Yt.check, !0), o(e, !1, "object", V(K.check), !1), o(e, !1, "show", $, !1, !0), o(e, !1, "toggle", $, !1, !1), e);
var Yr;
((e) => {
  e.check = gf;
})(Yr || (Yr = {}));
_t(Gn, (e) => {
  const t = e;
  return t.type === "base" ? (t.type = "state", t.value = null) : t.id !== void 0 && (t.value = t.id, t.id = void 0), Hi(t);
});
((e) => {
  e.defaultData = (t) => Wi({
    state: t,
    repeat: 0,
    delay: 0,
    delayDirection: "startOnce",
    direction: "normal",
    duration: 300,
    easing: 4,
    control1: null,
    control2: null,
    mass: null,
    stiffness: null,
    damping: null,
    velocity: null
  }), e.defaultDataSpring = {
    mass: 1,
    stiffness: 80,
    damping: 10,
    velocity: 0
  }, e.defaultDataBezier = {
    control1: [0.5, 0],
    control2: [0.5, 1]
  }, e.defaultDataEasing = {
    // 	https://www.w3.org/TR/css-easing-1/#cubic-bezier-easing-functions
    linear: [0, 0, 1, 1],
    ease: [0.25, 0.1, 0.25, 1],
    easeIn: [0.42, 0, 1, 1],
    easeOut: [0, 0, 0.58, 1],
    easeInOut: [0.42, 0, 0.58, 1]
  };
})(Wr || (Wr = {}));
((e) => {
  function t(r) {
    return {
      type: "transition",
      runMode: "repeat",
      object: r,
      tweens: new Ae(),
      repeat: 0,
      delay: 0,
      delayDirection: "startOnce",
      direction: "normal",
      name: "Transition"
    };
  }
  e.defaultData = t;
})(Hr || (Hr = {}));
((e) => {
  function t(r) {
    return {
      type: "video",
      object: r,
      layerId: null,
      toggle: "none",
      delay: 0,
      volume: 9,
      autoLoop: !0,
      interaction: "play",
      triggerAfter: "autoplay",
      name: "Video"
    };
  }
  e.defaultData = t;
})(qr || (qr = {}));
((e) => {
  function t() {
    return {
      type: "link",
      target: "Tab",
      url: "",
      name: "Link"
    };
  }
  e.defaultData = t;
})(Zr || (Zr = {}));
((e) => {
  function t(r) {
    return {
      type: "show",
      object: r,
      name: "Show / Hide",
      show: !0,
      toggle: !1
    };
  }
  e.defaultData = t;
})(Yr || (Yr = {}));
const wf = (e) => (w(e), o(e, !1, "enabled", $, !1, !0), e);
function yf() {
  return {
    enabled: !0
  };
}
var Me;
((e) => {
  e.check = wf, e.defaultData = yf;
})(Me || (Me = {}));
const vf = (e) => (w(e), o(e, !1, "base", Me.check, !0), o(e, !1, "offset", I.check, !1), o(e, !1, "blur", u, !1), o(e, !1, "spread", u, !1), o(e, !1, "color", Se.check, !1), e);
var as;
((e) => {
  e.check = vf;
})(as || (as = {}));
const mf = (e) => (w(e), o(e, !1, "base", Me.check, !0), o(e, !1, "offset", I.check, !1), o(e, !1, "blur", u, !1), o(e, !1, "spread", u, !1), o(e, !1, "color", Se.check, !1), e);
var ss;
((e) => {
  e.check = mf;
})(ss || (ss = {}));
const kf = (e) => (w(e), o(e, !1, "radius", u, !1), e);
var os;
((e) => {
  e.check = kf;
})(os || (os = {}));
const Sf = (e) => (w(e), o(e, !1, "radius_start", u, !1), o(e, !1, "radius_end", u, !1), o(e, !1, "position_start", I.check, !1), o(e, !1, "position_end", I.check, !1), e);
var is;
((e) => {
  e.check = Sf;
})(is || (is = {}));
const cs = (e) => {
  switch (w(e), e.type) {
    case "Uniform":
      return C(e, "Uniform", os.check);
    case "Progressive":
      return C(e, "Progressive", is.check);
    default:
      throw new Error("Invalid type for BlurData");
  }
};
var It;
((e) => {
  e.check = cs;
})(It || (It = {}));
const Af = (e) => (w(e), o(e, !0, "radius", u, !1), o(e, !0, "radius_start", u, !1), o(e, !0, "radius_end", u, !1), o(e, !0, "position_start", I.check, !1), o(e, !0, "position_end", I.check, !1), e);
function xf() {
  return {
    radius: void 0,
    radius_start: void 0,
    radius_end: void 0,
    position_start: void 0,
    position_end: void 0
  };
}
var ls;
((e) => {
  e.check = Af, e.defaultData = xf;
})(ls || (ls = {}));
const Of = (e) => (w(e), o(e, !1, "base", Me.check, !0), o(e, !1, "blurData", It.check, !1), e);
var fs;
((e) => {
  e.check = Of;
})(fs || (fs = {}));
const Ef = (e) => (w(e), o(e, !1, "base", Me.check, !0), o(e, !1, "blurData", It.check, !1), e);
var us;
((e) => {
  e.check = Ef;
})(us || (us = {}));
const Df = (e) => (w(e), o(e, !1, "base", Me.check, !0), o(e, !1, "offset", I.check, !1, I.new_(0, 0)), o(e, !1, "distortion", u, !1, 15), o(e, !1, "depth", u, !1, 10), o(e, !1, "blur", u, !1, 10), o(e, !1, "chromatic_aberration", u, !1, 0), o(e, !1, "chromatic_aberration_is_edge_only", $, !1, !0), o(e, !1, "profile", u, !1, 0), o(e, !1, "magnification", u, !1, 0), e);
var ds;
((e) => {
  e.check = Df;
})(ds || (ds = {}));
const Pf = (e) => (w(e), o(e, !1, "amplitude", u, !1), e);
var hs;
((e) => {
  e.check = Pf;
})(hs || (hs = {}));
var Xn = /* @__PURE__ */ ((e) => (e.Linear = "Linear", e.Radial = "Radial", e))(Xn || {});
const If = [
  "Linear",
  "Radial"
  /* Radial */
], Cf = (e) => {
  if (!If.includes(e))
    throw new Error("Invalid value for AmplitudeFalloffTypeData");
  return e;
};
((e) => {
  e.check = Cf;
})(Xn || (Xn = {}));
const $f = (e) => (w(e), o(e, !1, "amplitude_start", u, !1), o(e, !1, "amplitude_end", u, !1), o(e, !1, "position_start", I.check, !1), o(e, !1, "position_end", I.check, !1), o(
  e,
  !1,
  "amplitude_falloff_type",
  Xn.check,
  !1,
  "Linear"
  /* Linear */
), o(e, !1, "taper", u, !1, 0), e);
var ps;
((e) => {
  e.check = $f;
})(ps || (ps = {}));
const _s = (e) => {
  switch (w(e), e.type) {
    case "Uniform":
      return C(e, "Uniform", hs.check);
    case "Progressive":
      return C(e, "Progressive", ps.check);
    default:
      throw new Error("Invalid type for AmplitudeData");
  }
};
var Qe;
((e) => {
  e.check = _s;
})(Qe || (Qe = {}));
const Rf = (e) => (w(e), o(e, !0, "amplitude", u, !1), o(e, !0, "amplitude_start", u, !1), o(e, !0, "amplitude_end", u, !1), o(e, !0, "position_start", I.check, !1), o(e, !0, "position_end", I.check, !1), o(e, !0, "taper", u, !1), e);
function Tf() {
  return {
    amplitude: void 0,
    amplitude_start: void 0,
    amplitude_end: void 0,
    position_start: void 0,
    position_end: void 0,
    taper: void 0
  };
}
var bs;
((e) => {
  e.check = Rf, e.defaultData = Tf;
})(bs || (bs = {}));
var Jr = /* @__PURE__ */ ((e) => (e.Simplex = "Simplex", e.Fbm = "Fbm", e.Voronoi = "Voronoi", e.Sine = "Sine", e))(Jr || {});
const Uf = [
  "Simplex",
  "Fbm",
  "Voronoi",
  "Sine"
  /* Sine */
], jf = (e) => {
  if (!Uf.includes(e))
    throw new Error("Invalid value for NoiseTypeData");
  return e;
};
((e) => {
  e.check = jf;
})(Jr || (Jr = {}));
const Ki = (e) => (w(e), o(e, !1, "base", Me.check, !0), o(
  e,
  !1,
  "noise_type",
  Jr.check,
  !1,
  "Simplex"
  /* Simplex */
), o(e, !1, "blur", u, !1), o(e, !1, "amplitudeData", Qe.check, !1), o(e, !1, "scale", u, !1), o(e, !1, "stretch", I.check, !1), o(e, !1, "offset", I.check, !1), o(e, !1, "movement", u, !1), o(e, !1, "seed", u, !1, 0), e);
var ea;
((e) => {
  e.check = Ki;
})(ea || (ea = {}));
const Gi = (e) => (w(e), o(e, !1, "base", Me.check, !0), o(
  e,
  !1,
  "noise_type",
  Jr.check,
  !1,
  "Simplex"
  /* Simplex */
), o(e, !1, "blur", u, !1), o(e, !1, "amplitudeData", Qe.check, !1), o(e, !1, "scale", u, !1), o(e, !1, "stretch", I.check, !1), o(e, !1, "offset", I.check, !1), o(e, !1, "movement", u, !1), o(e, !1, "seed", u, !1, 0), e);
var ta;
((e) => {
  e.check = Gi;
})(ta || (ta = {}));
var ra = /* @__PURE__ */ ((e) => (e.Sphere = "Sphere", e.Cylinder = "Cylinder", e))(ra || {});
const Bf = [
  "Sphere",
  "Cylinder"
  /* Cylinder */
], Mf = (e) => {
  if (!Bf.includes(e))
    throw new Error("Invalid value for ProjectionEffectKindData");
  return e;
};
((e) => {
  e.check = Mf;
})(ra || (ra = {}));
var na = /* @__PURE__ */ ((e) => (e.Auto = "Auto", e.Custom = "Custom", e))(na || {});
const Lf = [
  "Auto",
  "Custom"
  /* Custom */
], zf = (e) => {
  if (!Lf.includes(e))
    throw new Error("Invalid value for ShadowColorTypeData");
  return e;
};
((e) => {
  e.check = zf;
})(na || (na = {}));
const So = (e) => (w(e), o(e, !1, "enabled", $, !1, !1), o(e, !1, "intensity", u, !1), o(e, !1, "color", $e.check, !1), o(e, !1, "shadowColor", $e.check, !1), o(
  e,
  !1,
  "shadowColorType",
  na.check,
  !1,
  "Auto"
  /* Auto */
), o(e, !1, "height", u, !1), o(e, !1, "direction", u, !1), o(e, !1, "ambient", u, !1, 0), o(e, !1, "ambientColor", $e.check, !1), o(e, !1, "specular", u, !1, 0), e);
var lt;
((e) => {
  e.check = So;
})(lt || (lt = {}));
const Ff = (e) => (w(e), o(e, !0, "intensity", u, !1), o(e, !0, "color", $e.check, !1), o(e, !0, "shadowColor", $e.check, !1), o(e, !0, "height", u, !1), o(e, !0, "direction", u, !1), o(e, !0, "ambient", u, !1), o(e, !0, "ambientColor", $e.check, !1), e);
function Vf() {
  return {
    intensity: void 0,
    color: void 0,
    shadowColor: void 0,
    height: void 0,
    direction: void 0,
    ambient: void 0,
    ambientColor: void 0
  };
}
var gs;
((e) => {
  e.check = Ff, e.defaultData = Vf;
})(gs || (gs = {}));
const Nf = (e) => (w(e), o(e, !1, "base", Me.check, !0), o(e, !1, "inputSize", I.check, !1), o(e, !1, "inputQuality", u, !1), o(e, !1, "kind", ra.check, !1), o(e, !1, "radius", u, !1), o(e, !1, "height", u, !1), o(e, !1, "rotation", pe.check, !1), o(e, !1, "side", Vr.check, !1), o(e, !1, "perspective", u, !1), o(e, !1, "light", lt.check, !1), e);
var ws;
((e) => {
  e.check = Nf;
})(ws || (ws = {}));
var aa = /* @__PURE__ */ ((e) => (e.Torus = "Torus", e.Sphere = "Sphere", e.Custom = "Custom", e))(aa || {});
const Hf = [
  "Torus",
  "Sphere",
  "Custom"
  /* Custom */
], Wf = (e) => {
  if (!Hf.includes(e))
    throw new Error("Invalid value for Mesh3dEffectGeometryData");
  return e;
};
((e) => {
  e.check = Wf;
})(aa || (aa = {}));
var sa = /* @__PURE__ */ ((e) => (e.Round = "Round", e.Flat = "Flat", e.FlatRounded = "FlatRounded", e.Concave = "Concave", e.Inflate = "Inflate", e))(sa || {});
const Kf = [
  "Round",
  "Flat",
  "FlatRounded",
  "Concave",
  "Inflate"
  /* Inflate */
], Gf = (e) => {
  if (!Kf.includes(e))
    throw new Error("Invalid value for Mesh3dBevelTypeData");
  return e;
};
((e) => {
  e.check = Gf;
})(sa || (sa = {}));
const qf = (e) => (w(e), o(e, !1, "enabled", $, !1, !1), o(e, !1, "color", $e.check, !1), o(e, !1, "bias", u, !1, 0.1), o(e, !1, "scale", u, !1, 1), o(e, !1, "intensity", u, !1, 2), o(e, !1, "factor", u, !1, 1), e);
var ft;
((e) => {
  e.check = qf;
})(ft || (ft = {}));
const Zf = (e) => (w(e), o(e, !0, "color", $e.check, !1), o(e, !0, "bias", u, !1), o(e, !0, "scale", u, !1), o(e, !0, "intensity", u, !1), o(e, !0, "factor", u, !1), e);
function Yf() {
  return {
    color: void 0,
    bias: void 0,
    scale: void 0,
    intensity: void 0,
    factor: void 0
  };
}
var ys;
((e) => {
  e.check = Zf, e.defaultData = Yf;
})(ys || (ys = {}));
const Jf = (e) => (w(e), o(e, !1, "enabled", $, !1, !1), o(e, !1, "rotation", pe.check, !1, pe.new_(0, 0, 0)), o(e, !1, "image", V(K.check), !1, null), e);
function Qf() {
  return {
    enabled: !1,
    rotation: pe.new_(0, 0, 0),
    image: null
  };
}
var ut;
((e) => {
  e.check = Jf, e.defaultData = Qf;
})(ut || (ut = {}));
const Xf = (e) => (w(e), o(e, !0, "rotation", pe.check, !1), e);
function eu() {
  return {
    rotation: void 0
  };
}
var vs;
((e) => {
  e.check = Xf, e.defaultData = eu;
})(vs || (vs = {}));
const tu = (e) => (w(e), o(e, !1, "color", $e.check, !1), o(e, !1, "roughness", u, !1, 0.2), o(e, !1, "metalness", u, !1, 0.2), o(e, !1, "reflectivity", u, !1, 0.2), o(e, !1, "transmission", u, !1, 0), o(e, !1, "chromatic_aberration", u, !1, 0), o(e, !1, "thickness", u, !1, 10), o(e, !1, "ior", u, !1, 1.5), o(e, !1, "blur", u, !1, 0), o(e, !1, "fresnel", ft.check, !1), o(e, !1, "environment", ut.check, !1), o(e, !1, "tonemapping", $, !1, !1), e);
var Ct;
((e) => {
  e.check = tu;
})(Ct || (Ct = {}));
const ru = (e) => (w(e), o(e, !0, "color", $e.check, !1), o(e, !0, "roughness", u, !1), o(e, !0, "metalness", u, !1), o(e, !0, "reflectivity", u, !1), o(e, !0, "transmission", u, !1), o(e, !0, "thickness", u, !1), o(e, !0, "ior", u, !1), o(e, !0, "blur", u, !1), o(e, !0, "fresnel", ys.check, !1), o(e, !0, "environment", vs.check, !1), e);
function nu() {
  return {
    color: void 0,
    roughness: void 0,
    metalness: void 0,
    reflectivity: void 0,
    transmission: void 0,
    thickness: void 0,
    ior: void 0,
    blur: void 0,
    fresnel: void 0,
    environment: void 0
  };
}
var ms;
((e) => {
  e.check = ru, e.defaultData = nu;
})(ms || (ms = {}));
const au = (e) => (w(e), o(e, !1, "base", Me.check, !0), o(e, !1, "geometry", aa.check, !1), o(e, !1, "radius", u, !1, 1), o(e, !1, "radius_b", u, !1, 1), o(e, !1, "rotation", pe.check, !1), o(e, !1, "perspective", u, !1, 90), o(e, !1, "material", Ct.check, !1), o(e, !1, "light", lt.check, !1), o(e, !1, "extrudeDepth", u, !1, 0), o(e, !1, "extrudeBevelSize", u, !1, 0), o(
  e,
  !1,
  "extrudeBevelType",
  sa.check,
  !1,
  "Round"
  /* Round */
), o(e, !1, "extrudeBevelSegments", u, !1, 1), o(e, !1, "extrudeBevelFlatRound", u, !1, 0.4), o(e, !1, "creaseAngle", u, !1, 40), o(e, !1, "customScale", u, !1, 1), o(e, !1, "subdivisions", u, !1, 12), o(e, !1, "extrudeCentered", $, !1, !1), e);
var ks;
((e) => {
  e.check = au;
})(ks || (ks = {}));
const rt = (e) => {
  switch (w(e), e.type) {
    case "DropShadow":
      return C(e, "DropShadow", as.check);
    case "InnerShadow":
      return C(e, "InnerShadow", ss.check);
    case "LayerBlur":
      return C(e, "LayerBlur", fs.check);
    case "BackgroundBlur":
      return C(e, "BackgroundBlur", us.check);
    case "LiquidGlass":
      return C(e, "LiquidGlass", ds.check);
    case "NoiseGlass":
      return C(e, "NoiseGlass", ea.check);
    case "LayerNoise":
      return C(e, "LayerNoise", ta.check);
    case "ProjectionEffect":
      return C(e, "ProjectionEffect", ws.check);
    case "Mesh3dEffect":
      return C(e, "Mesh3dEffect", ks.check);
    default:
      throw new Error("Invalid type for EffectData");
  }
};
var ke;
((e) => {
  e.check = rt;
})(ke || (ke = {}));
const su = (e) => (w(e), o(e, !0, "offset", I.check, !1), o(e, !0, "blur", u, !1), o(e, !0, "spread", u, !1), o(e, !0, "color", Se.check, !1), o(e, !0, "radius", u, !1), o(e, !0, "radius_b", u, !1), o(e, !0, "custom_scale", u, !1), o(e, !0, "height", u, !1), o(e, !0, "rotation", pe.check, !1), o(e, !0, "blurData", ls.check, !1), o(e, !0, "distortion", u, !1), o(e, !0, "depth", u, !1), o(e, !0, "chromatic_aberration", u, !1), o(e, !0, "profile", u, !1), o(e, !0, "magnification", u, !1), o(e, !0, "amplitudeData", bs.check, !1), o(e, !0, "scale", u, !1), o(e, !0, "stretch", I.check, !1), o(e, !0, "movement", u, !1), o(e, !0, "light", gs.check, !1), o(e, !0, "material", ms.check, !1), o(e, !0, "inputSize", I.check, !1), o(e, !0, "perspective", u, !1), o(e, !0, "extrudeDepth", u, !1), o(e, !0, "extrudeBevelSize", u, !1), o(e, !0, "extrudeBevelFlatRound", u, !1), e);
function ou() {
  return {
    offset: void 0,
    blur: void 0,
    spread: void 0,
    color: void 0,
    radius: void 0,
    radius_b: void 0,
    custom_scale: void 0,
    height: void 0,
    rotation: void 0,
    blurData: void 0,
    distortion: void 0,
    depth: void 0,
    chromatic_aberration: void 0,
    profile: void 0,
    magnification: void 0,
    amplitudeData: void 0,
    scale: void 0,
    stretch: void 0,
    movement: void 0,
    light: void 0,
    material: void 0,
    inputSize: void 0,
    perspective: void 0,
    extrudeDepth: void 0,
    extrudeBevelSize: void 0,
    extrudeBevelFlatRound: void 0
  };
}
var Ss;
((e) => {
  e.check = su, e.defaultData = ou;
})(Ss || (Ss = {}));
((e) => {
  e.defaultData = (r = "Uniform") => {
    switch (r) {
      case "Uniform":
        return cs({
          type: r,
          radius: 10
        });
      case "Progressive":
        return cs({
          type: r,
          radius_start: 0,
          radius_end: 20,
          position_start: [0.5, 0],
          position_end: [0.5, 1]
        });
    }
  }, e.statefulKeys = [
    "radius",
    "radius_start",
    "radius_end",
    "position_start",
    "position_end"
  ];
  function t(r, n) {
    return _e(r, n);
  }
  e.applyState = t;
})(It || (It = {}));
((e) => {
  e.statefulKeys = [
    "color",
    "shadowColor",
    "intensity",
    "height",
    "direction",
    "ambient",
    "ambientColor",
    "specular"
  ], e.defaultData = () => So({
    enabled: !1,
    color: [1, 1, 1],
    intensity: 1,
    height: 40,
    direction: 200,
    ambient: 0.3,
    ambientColor: [1, 1, 1],
    shadowColor: [0, 0, 0],
    shadowColorType: "Auto",
    specular: 0.3
  });
  function t(r, n) {
    return _e(r, n);
  }
  e.applyState = t;
})(lt || (lt = {}));
((e) => {
  e.defaultData = (r = "Uniform") => {
    switch (r) {
      case "Uniform":
        return _s({
          type: r,
          amplitude: 8
        });
      case "Progressive":
        return _s({
          type: r,
          amplitude_start: 8,
          amplitude_end: 0,
          position_start: [0.5, 0],
          position_end: [0.5, 1],
          amplitude_falloff_type: "Linear",
          taper: 0
        });
    }
  }, e.statefulKeys = [
    "amplitude",
    "amplitude_start",
    "amplitude_end",
    "position_start",
    "position_end",
    "taper"
  ];
  function t(r, n) {
    return _e(r, n);
  }
  e.applyState = t;
})(Qe || (Qe = {}));
((e) => {
  e.statefulKeys = [
    "color",
    "bias",
    "scale",
    "intensity",
    "factor"
  ];
  function t(n, a) {
    return _e(n, a);
  }
  e.applyState = t;
  function r() {
    return {
      enabled: !1,
      color: [1, 1, 1],
      bias: 0.1,
      scale: 1,
      intensity: 2,
      factor: 1
    };
  }
  e.defaultData = r;
})(ft || (ft = {}));
((e) => {
  e.statefulKeys = ["rotation"];
  function t(r, n) {
    return _e(r, n);
  }
  e.applyState = t;
})(ut || (ut = {}));
((e) => {
  e.statefulKeys = [
    "color",
    "roughness",
    "metalness",
    "reflectivity",
    "transmission",
    "thickness",
    "ior",
    "blur"
  ];
  function t(n, a) {
    const { fresnel: s, environment: i, ...l } = n, { fresnel: f, environment: p, ...g } = a || {}, y = ft.applyState(s, f), S = ut.applyState(i, p);
    return _e(
      { ...l, fresnel: y, environment: S },
      g
    );
  }
  e.applyState = t;
  function r() {
    return {
      color: [0.2, 0.2, 0.2],
      roughness: 0.8,
      metalness: 0.2,
      reflectivity: 2.05,
      transmission: 0.1,
      chromatic_aberration: 0,
      thickness: 10,
      ior: 1.5,
      blur: 0.91,
      fresnel: ft.defaultData(),
      environment: ut.defaultData(),
      tonemapping: !0
    };
  }
  e.defaultData = r;
})(Ct || (Ct = {}));
((e) => {
  e.defaultData = (r = "DropShadow") => {
    switch (r) {
      case "LayerBlur":
      case "BackgroundBlur":
        return rt({
          type: r,
          blurData: {
            type: "Uniform",
            radius: 10
          },
          enabled: !0
        });
      case "DropShadow":
      case "InnerShadow":
        return rt({
          type: r,
          offset: [0, 4],
          blur: 5,
          spread: 0,
          color: [0, 0, 0, 0.4],
          enabled: !0
        });
      case "LiquidGlass":
        return rt({
          type: r,
          offset: [0, 0],
          distortion: 15,
          depth: 10,
          blur: 10,
          chromatic_aberration: 0,
          chromatic_aberration_is_edge_only: !0,
          profile: 0,
          magnification: 0,
          enabled: !0
        });
      case "ProjectionEffect": {
        const n = {
          type: r,
          enabled: !0,
          rotation: [0, 0, 0],
          kind: "Sphere",
          side: Vr.Both,
          radius: 3,
          height: 6,
          light: lt.defaultData(),
          inputSize: [1, 1],
          inputQuality: 4,
          perspective: 10
        };
        return rt(n);
      }
      case "NoiseGlass":
        return rt({
          type: r,
          noise_type: "Simplex",
          blur: 0,
          amplitudeData: {
            type: "Uniform",
            amplitude: 10
          },
          scale: 4,
          stretch: [1, 1],
          offset: [0, 0],
          movement: 0,
          seed: 0,
          enabled: !0
        });
      case "LayerNoise":
        return rt({
          type: r,
          noise_type: "Simplex",
          blur: 0,
          amplitudeData: {
            type: "Uniform",
            amplitude: 10
          },
          scale: 4,
          stretch: [1, 1],
          offset: [0, 0],
          movement: 0,
          seed: 0,
          enabled: !0
        });
      case "Mesh3dEffect": {
        const n = So({
          enabled: !0,
          color: [1, 1, 1],
          intensity: 1,
          height: 200,
          direction: 280,
          ambient: 0.75,
          ambientColor: [1, 1, 1],
          shadowColor: [0.145, 0.149, 0.196],
          shadowColorType: "Auto",
          specular: 0.1
        }), a = {
          type: r,
          enabled: !0,
          rotation: [-15, 30, 0],
          geometry: "Custom",
          radius: 3,
          radius_b: 1,
          perspective: 36,
          material: Ct.defaultData(),
          light: n,
          extrudeDepth: 50,
          extrudeBevelSize: 6,
          extrudeBevelType: "Round",
          extrudeBevelSegments: 3,
          extrudeBevelFlatRound: 0.4,
          creaseAngle: 40,
          extrudeCentered: !0,
          customScale: 5,
          subdivisions: 12
        };
        return rt(a);
      }
    }
  }, e.statefulKeys = [
    "offset",
    "blur",
    "spread",
    "color",
    "radius",
    "radius_b",
    "custom_scale",
    "depth",
    "distortion",
    "chromatic_aberration",
    "profile",
    "magnification",
    "scale",
    "stretch",
    "movement",
    "height",
    "rotation",
    "inputSize",
    "perspective",
    "extrudeDepth",
    "extrudeBevelSize",
    "extrudeBevelFlatRound"
  ], e.statefulContainers = [
    "blurData",
    "amplitudeData",
    "light",
    "material"
  ], e.statefulContainerKeys = {
    blurData: It.statefulKeys,
    amplitudeData: Qe.statefulKeys,
    light: lt.statefulKeys,
    material: Ct.statefulKeys
  }, e.statefulNestedContainers = [
    "fresnel",
    "environment"
  ], e.statefulNestedContainerKeys = {
    fresnel: ft.statefulKeys,
    environment: ut.statefulKeys
  };
  function t(r, n) {
    if (n === void 0)
      return r;
    const {
      blurData: a,
      amplitudeData: s,
      light: i,
      material: l,
      ...f
    } = n;
    if (r = _e(r, f), "blurData" in r && (r = Ne(r, "blurData", a)), "amplitudeData" in r && (r = Ne(r, "amplitudeData", s)), "light" in r && (r = Ne(r, "light", i)), "material" in r && l !== void 0) {
      const { fresnel: p, environment: g, ...y } = l;
      r = Ne(r, "material", y), p !== void 0 && (r = { ...r, material: Ne(r.material, "fresnel", p) }), g !== void 0 && (r = {
        ...r,
        material: Ne(r.material, "environment", g)
      });
    }
    return r;
  }
  e.applyState = t;
})(ke || (ke = {}));
_t(ea, (e) => {
  const t = e;
  if (t.amplitude !== void 0 && typeof t.amplitude == "number") {
    const r = Qe.defaultData("Uniform");
    t.amplitudeData = {
      ...r,
      amplitude: t.amplitude ?? r.amplitude
    };
  }
  return t.amplitude_falloff_type === void 0 && (t.amplitude_falloff_type = "Linear"), Ki(t);
});
_t(ta, (e) => {
  const t = e;
  if (t.amplitude !== void 0 && typeof t.amplitude == "number") {
    const r = Qe.defaultData("Uniform");
    t.amplitudeData = {
      ...r,
      amplitude: t.amplitude ?? r.amplitude
    };
  }
  return t.amplitude_falloff_type === void 0 && (t.amplitude_falloff_type = "Linear"), Gi(t);
});
const iu = (e) => (w(e), o(e, !1, "enabled", $, !1, !0), o(e, !1, "name", se, !1, ""), e);
function cu() {
  return {
    enabled: !0,
    name: ""
  };
}
var dt;
((e) => {
  e.check = iu, e.defaultData = cu;
})(dt || (dt = {}));
const qi = (e) => {
  switch (w(e), e.type) {
    case "start":
      return C(e, "start", As.check);
    case "mouseDown":
      return C(e, "mouseDown", xt.check);
    case "mouseUp":
      return C(e, "mouseUp", xt.check);
    case "mousePress":
      return C(e, "mousePress", xt.check);
    case "mouseHover":
      return C(e, "mouseHover", xs.check);
    case "keyDown":
      return C(e, "keyDown", Ot.check);
    case "keyUp":
      return C(e, "keyUp", Ot.check);
    case "keyPress":
      return C(e, "keyPress", Ot.check);
    case "follow":
      return C(e, "follow", Qr.check);
    case "lookAt":
      return C(e, "lookAt", en.check);
    default:
      throw new Error("Invalid type for EventData");
  }
};
var Jt;
((e) => {
  e.check = qi;
})(Jt || (Jt = {}));
const lu = (e) => (w(e), o(e, !1, "base", dt.check, !0), o(e, !1, "actions", ve.check(Pt.check), !1), e);
var As;
((e) => {
  e.check = lu;
})(As || (As = {}));
const Zi = (e) => (w(e), o(e, !1, "base", dt.check, !0), o(e, !1, "actions", ve.check(Pt.check), !1), o(e, !1, "mode", oa.check, !1), e);
var xt;
((e) => {
  e.check = Zi;
})(xt || (xt = {}));
const fu = (e) => (w(e), o(e, !1, "base", dt.check, !0), o(e, !1, "actions", ve.check(Pt.check), !1), e);
var xs;
((e) => {
  e.check = fu;
})(xs || (xs = {}));
var oa = /* @__PURE__ */ ((e) => (e.object = "object", e.canvas = "canvas", e))(oa || {});
const uu = [
  "object",
  "canvas"
  /* canvas */
], du = (e) => {
  if (!uu.includes(e))
    throw new Error("Invalid value for MouseEventModeData");
  return e;
};
((e) => {
  e.check = du;
})(oa || (oa = {}));
const Yi = (e) => (w(e), o(e, !1, "base", dt.check, !0), o(e, !1, "actions", ve.check(Pt.check), !1), o(e, !1, "key", V(se), !1), e);
var Ot;
((e) => {
  e.check = Yi;
})(Ot || (Ot = {}));
const Ji = (e) => (w(e), o(e, !1, "base", dt.check, !0), o(e, !1, "dampingFactor", u, !1), o(e, !1, "resetOnPointerLeave", $, !1), o(e, !1, "resetSpeed", u, !1), o(e, !1, "enabledTranslation", vn($, 2), !1), o(e, !1, "maxDelta", u, !1), o(e, !1, "target", Xr.check, !1), o(e, !1, "limitDistanceEnabled", $, !1), o(e, !1, "limitDistance", u, !1), o(e, !1, "snapDelay", u, !1), o(e, !1, "resetAfterDistanceLimit", $, !1), o(e, !1, "actions", ve.check(Pt.check), !1), o(
  e,
  !1,
  "limitType",
  ia.check,
  !1,
  "Radial"
  /* Radial */
), o(e, !1, "planarLimitDistance", I.check, !1, I.new_(1e3, 1e3)), e);
var Qr;
((e) => {
  e.check = Ji;
})(Qr || (Qr = {}));
const Qi = (e) => {
  switch (w(e), e.type) {
    case "entity":
      return We(e, "entity", K.check), e;
    case "cursor":
      return We(e, "cursor", Li), e;
    default:
      throw new Error("Invalid type for FollowEventTargetData");
  }
};
var Xr;
((e) => {
  e.check = Qi;
})(Xr || (Xr = {}));
var ia = /* @__PURE__ */ ((e) => (e.Radial = "Radial", e.Planar = "Planar", e))(ia || {});
const hu = [
  "Radial",
  "Planar"
  /* Planar */
], pu = (e) => {
  if (!hu.includes(e))
    throw new Error("Invalid value for FollowLimitType");
  return e;
};
((e) => {
  e.check = pu;
})(ia || (ia = {}));
const Xi = (e) => (w(e), o(e, !1, "base", dt.check, !0), o(e, !1, "distance", u, !1, 1e3), o(e, !1, "axis", Fr.check, !1), o(e, !1, "dampingFactor", u, !1), o(e, !1, "resetOnPointerLeave", $, !1), o(e, !1, "resetSpeed", u, !1), o(e, !1, "target", Xr.check, !1), o(e, !1, "limitDistanceEnabled", $, !1), o(e, !1, "limitDistance", u, !1), o(e, !1, "snapDelay", u, !1), o(e, !1, "resetAfterDistanceLimit", $, !1), e);
var en;
((e) => {
  e.check = Xi;
})(en || (en = {}));
_t(Xr, (e) => {
  const t = e;
  return t.id !== void 0 && (t.value = t.id, t.id = void 0), Qi(t);
});
((e) => {
  e.defaultData = () => qi({
    enabled: !0,
    type: "start",
    actions: [],
    name: "Start"
  });
})(Jt || (Jt = {}));
((e) => {
  e.defaultData = (t = "Mouse") => Zi({
    enabled: !0,
    mode: "object",
    actions: [],
    name: t
  });
})(xt || (xt = {}));
((e) => {
  e.defaultData = (t = "Keyboard") => Yi({
    enabled: !0,
    key: null,
    actions: [],
    name: t
  });
})(Ot || (Ot = {}));
((e) => {
  e.defaultData = (t = "Follow") => Ji({
    enabled: !0,
    actions: [],
    maxDelta: 0,
    dampingFactor: 1,
    target: { type: "cursor" },
    resetOnPointerLeave: !0,
    resetAfterDistanceLimit: !1,
    enabledTranslation: [!0, !0],
    limitDistanceEnabled: !1,
    limitDistance: 1e3,
    snapDelay: 0,
    resetSpeed: 5,
    limitType: "Radial",
    planarLimitDistance: [1e3, 1e3],
    name: t
  });
})(Qr || (Qr = {}));
((e) => {
  e.defaultData = (t = "Look At") => {
    const r = {
      enabled: !0,
      dampingFactor: 1,
      axis: Fr.y,
      target: { type: "cursor" },
      distance: 1e3,
      resetOnPointerLeave: !0,
      resetAfterDistanceLimit: !0,
      limitDistanceEnabled: !1,
      limitDistance: 1e3,
      snapDelay: 0,
      resetSpeed: 5,
      name: t
    };
    return Xi(r);
  };
})(en || (en = {}));
const _u = (e) => (w(e), o(e, !1, "enabled", $, !1, !0), e);
function bu() {
  return {
    enabled: !0
  };
}
var $t;
((e) => {
  e.check = _u, e.defaultData = bu;
})($t || ($t = {}));
const gu = (e) => (w(e), o(e, !1, "base", $t.check, !0), o(e, !1, "color", Se.check, !1, Dt.new_(0.2, 0.2, 0.2, 1)), e);
var Rt;
((e) => {
  e.check = gu;
})(Rt || (Rt = {}));
const wu = (e) => (w(e), o(e, !1, "base", $t.check, !0), o(e, !1, "image", V(K.check), !1, null), o(e, !1, "opacity", u, !1, 1), e);
var Tt;
((e) => {
  e.check = wu;
})(Tt || (Tt = {}));
const yu = (e) => (w(e), o(e, !1, "base", $t.check, !0), o(e, !1, "frameObject", V(K.check), !1, null), o(e, !1, "scale", u, !1, 2), o(e, !1, "opacity", u, !1, 1), e);
var Qt;
((e) => {
  e.check = yu;
})(Qt || (Qt = {}));
const vu = (e) => (w(e), o(e, !1, "base", $t.check, !0), o(e, !1, "video", V(K.check), !1, null), o(e, !1, "opacity", u, !1, 1), e);
var Xt;
((e) => {
  e.check = vu;
})(Xt || (Xt = {}));
const mu = (e) => (w(e), o(e, !1, "color", Se.check, !1), o(e, !1, "stop", u, !1), e);
var Os;
((e) => {
  e.check = mu;
})(Os || (Os = {}));
const ku = (e) => (w(e), o(e, !0, "color", Se.check, !1), o(e, !0, "stop", u, !1), e);
function Su() {
  return {
    color: void 0,
    stop: void 0
  };
}
var ca;
((e) => {
  e.check = ku, e.defaultData = Su;
})(ca || (ca = {}));
var er = /* @__PURE__ */ ((e) => (e.Linear = "Linear", e.Radial = "Radial", e.Polar = "Polar", e))(er || {});
const Au = [
  "Linear",
  "Radial",
  "Polar"
  /* Polar */
], xu = (e) => {
  if (!Au.includes(e))
    throw new Error("Invalid value for GradientTypeData");
  return e;
};
((e) => {
  e.check = xu;
})(er || (er = {}));
const Ou = (e) => (w(e), o(e, !1, "base", $t.check, !0), o(e, !1, "gradientType", er.check, !1), o(
  e,
  !1,
  "stops",
  Q.check(Os.check),
  !1,
  Ge.default_stops()
), o(e, !1, "isSmooth", $, !1, !1), o(e, !1, "opacity", u, !1, 1), o(e, !1, "start", I.check, !1, I.new_(0, 0.5)), o(e, !1, "end", I.check, !1, I.new_(1, 0.5)), o(e, !1, "aspectRadius", u, !1, 1), e);
var Ge;
((e) => {
  e.check = Ou;
})(Ge || (Ge = {}));
const ec = (e) => {
  switch (w(e), e.type) {
    case "Color":
      return C(e, "Color", Rt.check);
    case "Image":
      return C(e, "Image", Tt.check);
    case "Video":
      return C(e, "Video", Xt.check);
    case "Frame":
      return C(e, "Frame", Qt.check);
    case "Gradient":
      return C(e, "Gradient", Ge.check);
    default:
      throw new Error("Invalid type for FillData");
  }
};
var xe;
((e) => {
  e.check = ec;
})(xe || (xe = {}));
const Eu = (e) => (w(e), o(e, !0, "color", Se.check, !1), o(e, !0, "stops", Q.check(ca.check), !1), o(e, !0, "opacity", u, !1), o(e, !0, "start", I.check, !1), o(e, !0, "end", I.check, !1), o(e, !0, "aspectRadius", u, !1), e);
function Du() {
  return {
    color: void 0,
    stops: void 0,
    opacity: void 0,
    start: void 0,
    end: void 0,
    aspectRadius: void 0
  };
}
var la;
((e) => {
  e.check = Eu, e.defaultData = Du;
})(la || (la = {}));
((e) => {
  function t(n = "Color") {
    switch (n) {
      case "Image":
        return Tt.defaultData();
      case "Video":
        return Xt.defaultData();
      case "Frame":
        return Qt.defaultData();
      case "Gradient":
        return Ge.defaultData();
      case "Color":
      default:
        return Rt.defaultData();
    }
  }
  e.defaultData = t;
  function r(n, a) {
    if (a === void 0)
      return n;
    const { stops: s, ...i } = a;
    return n.type === "Gradient" && (n = kt(n, "stops", Ni(n.stops, s, _e))), n = _e(n, i), n;
  }
  e.applyState = r, e.statefulKeys = ["color", "opacity", "start", "end"], e.stopsStatefulKeys = ["color", "stop"];
})(xe || (xe = {}));
((e) => {
  function t(r = null) {
    return {
      enabled: !0,
      type: "Image",
      image: r,
      opacity: 1
    };
  }
  e.defaultData = t;
})(Tt || (Tt = {}));
((e) => {
  function t(r = null) {
    return {
      enabled: !0,
      type: "Video",
      video: r,
      opacity: 1
    };
  }
  e.defaultData = t;
})(Xt || (Xt = {}));
((e) => {
  function t(r = null) {
    return {
      enabled: !0,
      type: "Frame",
      frameObject: r,
      opacity: 1,
      scale: 1
    };
  }
  e.defaultData = t;
})(Qt || (Qt = {}));
((e) => {
  function t(r = [0.2, 0.2, 0.2, 1]) {
    return {
      enabled: !0,
      type: "Color",
      color: r
    };
  }
  e.defaultData = t;
})(Rt || (Rt = {}));
((e) => {
  function t(r, n) {
    return {
      enabled: !0,
      type: "Gradient",
      gradientType: "Linear",
      stops: e.default_stops(r, n),
      isSmooth: !1,
      opacity: 1,
      start: [0, 0.5],
      end: [1, 0.5],
      aspectRadius: 1
    };
  }
  e.defaultData = t, e.default_stops = (r = [0.27, 0.27, 0.27, 1], n = [0.84, 0.84, 0.84, 1]) => {
    let a = new ye();
    return a = a.add("00000-0-00-000-0000", { color: r, stop: 0 }), a = a.add("000-000-00000-000-0", { color: n, stop: 1 }), a;
  };
})(Ge || (Ge = {}));
xe.check = (e) => {
  e.type === void 0 && e.color !== void 0 && (e.type = "Color"), ec(e);
};
const tc = (e) => (w(e), o(e, !1, "size", I.check, !1), e);
var Le;
((e) => {
  e.check = tc;
})(Le || (Le = {}));
const Pu = (e) => (w(e), o(e, !1, "base", Le.check, !0), o(e, !1, "cornerRadius", Dt.check, !1), o(e, !1, "cornerSmoothing", u, !1, 0), e);
var Es;
((e) => {
  e.check = Pu;
})(Es || (Es = {}));
const Iu = (e) => (w(e), o(e, !1, "base", Le.check, !0), e);
var Ds;
((e) => {
  e.check = Iu;
})(Ds || (Ds = {}));
var fa = /* @__PURE__ */ ((e) => (e.Left = "Left", e.Right = "Right", e.Center = "Center", e.Justify = "Justify", e))(fa || {});
const Cu = [
  "Left",
  "Right",
  "Center",
  "Justify"
  /* Justify */
], $u = (e) => {
  if (!Cu.includes(e))
    throw new Error("Invalid value for HorizontalAlign");
  return e;
};
((e) => {
  e.check = $u;
})(fa || (fa = {}));
var ua = /* @__PURE__ */ ((e) => (e.Top = "Top", e.Center = "Center", e.Bottom = "Bottom", e))(ua || {});
const Ru = [
  "Top",
  "Center",
  "Bottom"
  /* Bottom */
], Tu = (e) => {
  if (!Ru.includes(e))
    throw new Error("Invalid value for VerticalAlign");
  return e;
};
((e) => {
  e.check = Tu;
})(ua || (ua = {}));
var da = /* @__PURE__ */ ((e) => (e.TopLeft = "TopLeft", e.TopCenter = "TopCenter", e.TopRight = "TopRight", e.Left = "Left", e.Center = "Center", e.Right = "Right", e.BottomLeft = "BottomLeft", e.BottomCenter = "BottomCenter", e.BottomRight = "BottomRight", e))(da || {});
const Uu = [
  "TopLeft",
  "TopCenter",
  "TopRight",
  "Left",
  "Center",
  "Right",
  "BottomLeft",
  "BottomCenter",
  "BottomRight"
  /* BottomRight */
], ju = (e) => {
  if (!Uu.includes(e))
    throw new Error("Invalid value for LayoutAlign");
  return e;
};
((e) => {
  e.check = ju;
})(da || (da = {}));
var ha = /* @__PURE__ */ ((e) => (e.Row = "Row", e.Column = "Column", e))(ha || {});
const Bu = [
  "Row",
  "Column"
  /* Column */
], Mu = (e) => {
  if (!Bu.includes(e))
    throw new Error("Invalid value for LayoutDirection");
  return e;
};
((e) => {
  e.check = Mu;
})(ha || (ha = {}));
const rc = (e) => (w(e), o(e, !1, "direction", ha.check, !1), o(e, !1, "wrap", $, !1), o(e, !1, "align", da.check, !1), o(e, !1, "gap", u, !1), o(e, !1, "rowGap", u, !1), o(e, !1, "autoGap", $, !1), o(e, !1, "autoRowGap", $, !1), o(e, !1, "leftPadding", u, !1), o(e, !1, "rightPadding", u, !1), o(e, !1, "topPadding", u, !1), o(e, !1, "bottomPadding", u, !1), o(e, !1, "masonry", $, !1, !1), e);
var tn;
((e) => {
  e.check = rc;
})(tn || (tn = {}));
const Lu = (e) => (w(e), o(e, !1, "base", Le.check, !0), o(e, !1, "cornerRadius", Dt.check, !1), o(e, !1, "cornerSmoothing", u, !1, 0), o(e, !1, "layout", V(tn.check), !1, null), o(e, !1, "clipContent", $, !1, !0), e);
var Ps;
((e) => {
  e.check = Lu;
})(Ps || (Ps = {}));
var pa = /* @__PURE__ */ ((e) => (e.None = "None", e.Upper = "Upper", e.Lower = "Lower", e))(pa || {});
const zu = [
  "None",
  "Upper",
  "Lower"
  /* Lower */
], Fu = (e) => {
  if (!zu.includes(e))
    throw new Error("Invalid value for TextTransform");
  return e;
};
((e) => {
  e.check = Fu;
})(pa || (pa = {}));
const Vu = (e) => (w(e), o(e, !1, "base", Le.check, !0), o(e, !1, "text", se, !1), o(e, !1, "fontSize", u, !1), o(e, !1, "horizontalAlign", fa.check, !1), o(e, !1, "verticalAlign", ua.check, !1), o(e, !1, "lineHeight", u, !1, 1.2), o(e, !1, "letterSpacing", u, !1, 0), o(
  e,
  !1,
  "textTransform",
  pa.check,
  !1,
  "None"
  /* None */
), o(e, !1, "font", K.check, !1, ht.default_font()), o(e, !1, "version", Je, !1, ht.default_version()), e);
var ht;
((e) => {
  e.check = Vu;
})(ht || (ht = {}));
var _a = /* @__PURE__ */ ((e) => (e.AND = "AND", e.OR = "OR", e.DIFF = "DIFF", e))(_a || {});
const Nu = [
  "AND",
  "OR",
  "DIFF"
  /* DIFF */
], Hu = (e) => {
  if (!Nu.includes(e))
    throw new Error("Invalid value for BooleanOpData");
  return e;
};
((e) => {
  e.check = Hu;
})(_a || (_a = {}));
const Wu = (e) => (w(e), o(e, !1, "base", Le.check, !0), o(e, !1, "op", _a.check, !1), o(e, !1, "corner", u, !1, 0), e);
var Is;
((e) => {
  e.check = Wu;
})(Is || (Is = {}));
const Ku = (e) => (w(e), o(e, !1, "base", Le.check, !0), o(e, !1, "bytes", Nr.check, !1), e);
var ba;
((e) => {
  e.check = Ku;
})(ba || (ba = {}));
const Gu = (e) => (w(e), o(e, !1, "base", Le.check, !0), o(e, !1, "spikes", u, !1), o(e, !1, "corner", u, !1), e);
var Cs;
((e) => {
  e.check = Gu;
})(Cs || (Cs = {}));
const qu = (e) => (w(e), o(e, !1, "base", Le.check, !0), o(e, !1, "innerRadiusPercent", u, !1), o(e, !1, "spikes", u, !1), o(e, !1, "corner", u, !1), e);
var $s;
((e) => {
  e.check = qu;
})($s || ($s = {}));
const nc = (e) => {
  switch (w(e), e.type) {
    case "Rectangle":
      return C(e, "Rectangle", Es.check);
    case "Ellipse":
      return C(e, "Ellipse", Ds.check);
    case "Text":
      return C(e, "Text", ht.check);
    case "Frame":
      return C(e, "Frame", Ps.check);
    case "Boolean":
      return C(e, "Boolean", Is.check);
    case "VecNet":
      return C(e, "VecNet", ba.check);
    case "Polygon":
      return C(e, "Polygon", Cs.check);
    case "Star":
      return C(e, "Star", $s.check);
    default:
      throw new Error("Invalid type for ShapeData");
  }
};
var pt;
((e) => {
  e.check = nc;
})(pt || (pt = {}));
const Zu = (e) => (w(e), o(e, !0, "size", I.check, !1), o(e, !0, "cornerRadius", Dt.check, !1), o(e, !0, "corner", u, !1), o(e, !0, "fontSize", u, !1), o(e, !0, "letterSpacing", u, !1), o(e, !0, "bytes", Nr.check, !1), o(e, !0, "spikes", u, !1), o(e, !0, "innerRadiusPercent", u, !1), e);
function Yu() {
  return {
    size: void 0,
    cornerRadius: void 0,
    corner: void 0,
    fontSize: void 0,
    letterSpacing: void 0,
    bytes: void 0,
    spikes: void 0,
    innerRadiusPercent: void 0
  };
}
var Rs;
((e) => {
  e.check = Zu, e.defaultData = Yu;
})(Rs || (Rs = {}));
_t(Le, (e) => {
  const t = e;
  if (t.size) {
    const r = Vi(t.size);
    mt(r, t.size) || (t.size = r);
  }
  return tc(e);
});
((e) => {
  e.default_font = () => "Inter_regular", e.default_version = () => 1, e.current_version = () => 3;
})(ht || (ht = {}));
((e) => {
  e.defaultData = (r = "Rectangle", n = [100, 100]) => {
    let a;
    switch (r) {
      case "Rectangle": {
        a = {
          type: r,
          cornerRadius: [0, 0, 0, 0],
          cornerSmoothing: 0,
          size: n
        };
        break;
      }
      case "Ellipse": {
        a = {
          type: r,
          size: n
        };
        break;
      }
      case "Text": {
        a = {
          type: r,
          text: "Hello",
          fontSize: 24,
          horizontalAlign: "Left",
          verticalAlign: "Top",
          lineHeight: 1.2,
          letterSpacing: 0,
          textTransform: "None",
          font: "Inter_regular",
          size: n,
          version: ht.current_version()
        };
        break;
      }
      case "Boolean": {
        a = {
          type: r,
          size: n,
          op: "DIFF",
          corner: 0
        };
        break;
      }
      case "Frame": {
        a = {
          type: r,
          cornerRadius: [0, 0, 0, 0],
          size: n,
          cornerSmoothing: 0,
          layout: null,
          clipContent: !0
        };
        break;
      }
      case "VecNet": {
        a = {
          type: r,
          bytes: new Uint8Array(),
          size: n
        };
        break;
      }
      case "Polygon": {
        a = {
          type: r,
          spikes: 3,
          corner: 0,
          size: n
        };
        break;
      }
      case "Star": {
        a = {
          type: r,
          innerRadiusPercent: 38.19,
          spikes: 5,
          corner: 0,
          size: n
        };
        break;
      }
    }
    return nc(a);
  };
  function t(r, n) {
    return _e(r, n);
  }
  e.applyState = t, e.statefulKeys = [
    "size",
    "cornerRadius",
    "corner",
    "fontSize",
    "letterSpacing",
    "bytes",
    "spikes",
    "innerRadiusPercent"
  ];
})(pt || (pt = {}));
((e) => {
  function t() {
    return rc({
      direction: "Row",
      wrap: !1,
      align: "TopLeft",
      gap: 10,
      rowGap: 10,
      autoGap: !1,
      autoRowGap: !1,
      leftPadding: 8,
      rightPadding: 8,
      topPadding: 8,
      bottomPadding: 8,
      masonry: !1
    });
  }
  e.defaultData = t;
})(tn || (tn = {}));
const Ju = (e) => (w(e), o(e, !1, "enabled", $, !1, !0), e);
function Qu() {
  return {
    enabled: !0
  };
}
var Ts;
((e) => {
  e.check = Ju, e.defaultData = Qu;
})(Ts || (Ts = {}));
var ga = /* @__PURE__ */ ((e) => (e.Butt = "Butt", e.Round = "Round", e.Square = "Square", e))(ga || {});
const Xu = [
  "Butt",
  "Round",
  "Square"
  /* Square */
], ed = (e) => {
  if (!Xu.includes(e))
    throw new Error("Invalid value for StrokeCap");
  return e;
};
((e) => {
  e.check = ed;
})(ga || (ga = {}));
var wa = /* @__PURE__ */ ((e) => (e.Inside = "Inside", e.Outside = "Outside", e.Center = "Center", e))(wa || {});
const td = [
  "Inside",
  "Outside",
  "Center"
  /* Center */
], rd = (e) => {
  if (!td.includes(e))
    throw new Error("Invalid value for StrokeAlign");
  return e;
};
((e) => {
  e.check = rd;
})(wa || (wa = {}));
var ya = /* @__PURE__ */ ((e) => (e.Miter = "Miter", e.Round = "Round", e.Bevel = "Bevel", e))(ya || {});
const nd = [
  "Miter",
  "Round",
  "Bevel"
  /* Bevel */
], ad = (e) => {
  if (!nd.includes(e))
    throw new Error("Invalid value for StrokeJoin");
  return e;
};
((e) => {
  e.check = ad;
})(ya || (ya = {}));
const sd = (e) => (w(e), o(e, !1, "length", u, !1, 0), o(e, !1, "gap", V(u), !1, null), o(e, !1, "offset", u, !1, 0), e);
function od() {
  return {
    length: 0,
    gap: null,
    offset: 0
  };
}
var rn;
((e) => {
  e.check = sd, e.defaultData = od;
})(rn || (rn = {}));
const id = (e) => (w(e), o(e, !1, "start", u, !1, 0), o(e, !1, "end", u, !1, 0.1), o(e, !1, "trimOffset", u, !1, 0), e);
function cd() {
  return {
    start: 0,
    end: 0.1,
    trimOffset: 0
  };
}
var nn;
((e) => {
  e.check = id, e.defaultData = cd;
})(nn || (nn = {}));
const ac = (e) => {
  switch (w(e), e.type) {
    case "Dash":
      return C(e, "Dash", rn.check);
    case "Trim":
      return C(e, "Trim", nn.check);
    default:
      throw new Error("Invalid type for StrokeDashOrTrimData");
  }
};
var Ut;
((e) => {
  e.check = ac;
})(Ut || (Ut = {}));
const ld = (e) => (w(e), o(e, !0, "length", u, !1), o(e, !0, "gap", V(u), !1), o(e, !0, "offset", u, !1), o(e, !0, "start", u, !1), o(e, !0, "end", u, !1), o(e, !0, "trimOffset", u, !1), e);
function fd() {
  return {
    length: void 0,
    gap: void 0,
    offset: void 0,
    start: void 0,
    end: void 0,
    trimOffset: void 0
  };
}
var Us;
((e) => {
  e.check = ld, e.defaultData = fd;
})(Us || (Us = {}));
const ud = (e) => {
  switch (w(e), e.type) {
    case "Color":
      return C(e, "Color", Rt.check);
    case "Image":
      return C(e, "Image", Tt.check);
    case "Gradient":
      return C(e, "Gradient", Ge.check);
    default:
      throw new Error("Invalid type for StrokeFillData");
  }
};
var jt;
((e) => {
  e.check = ud;
})(jt || (jt = {}));
const sc = (e) => (w(e), o(e, !1, "base", Ts.check, !0), o(e, !0, "color", Se.check, !1), o(e, !0, "fill", jt.check, !1), o(e, !1, "thickness", u, !1), o(e, !1, "dash", V(Ut.check), !1, null), o(
  e,
  !1,
  "align",
  wa.check,
  !1,
  "Center"
  /* Center */
), o(
  e,
  !1,
  "join",
  ya.check,
  !1,
  "Miter"
  /* Miter */
), o(
  e,
  !1,
  "cap",
  ga.check,
  !1,
  "Round"
  /* Round */
), e);
var je;
((e) => {
  e.check = sc;
})(je || (je = {}));
const dd = (e) => (w(e), o(e, !0, "fill", Bs.check, !1), o(e, !0, "thickness", u, !1), o(e, !0, "dash", Us.check, !1), e);
function hd() {
  return {
    fill: void 0,
    thickness: void 0,
    dash: void 0
  };
}
var js;
((e) => {
  e.check = dd, e.defaultData = hd;
})(js || (js = {}));
const pd = (e) => (w(e), o(e, !0, "color", Se.check, !1), o(e, !0, "stops", Q.check(ca.check), !1), o(e, !0, "opacity", u, !1), o(e, !0, "start", I.check, !1), o(e, !0, "end", I.check, !1), o(e, !0, "aspectRadius", u, !1), e);
function _d() {
  return {
    color: void 0,
    stops: void 0,
    opacity: void 0,
    start: void 0,
    end: void 0,
    aspectRadius: void 0
  };
}
var Bs;
((e) => {
  e.check = pd, e.defaultData = _d;
})(Bs || (Bs = {}));
((e) => {
  e.statefulKeys = [
    "length",
    "offset",
    "gap",
    "start",
    "end",
    "trimOffset"
  ];
})(Ut || (Ut = {}));
_t(Ut, (e) => (e.type === void 0 && (e.type = "Dash"), ac(e)));
_t(je, (e) => {
  const t = e;
  return !t.fill && t.color !== void 0 && (t.fill = {
    type: "Color",
    enabled: !0,
    color: wo(t.color)
  }, delete t.color), sc(e);
});
((e) => {
  e.withValues = (t = 0, r = 10, n = 0) => ({
    start: t,
    end: r,
    trimOffset: n
  });
})(nn || (nn = {}));
((e) => {
  e.withLength = (t = 10) => ({
    length: t,
    gap: null,
    offset: 0
  });
})(rn || (rn = {}));
((e) => {
  e.defaultData = (r = 2, n = jt.defaultData()) => ({
    enabled: !0,
    fill: n,
    thickness: r,
    align: "Center",
    join: "Miter",
    cap: "Round",
    dash: null
  }), e.defaultDataWithColor = (r = 2, n = [1, 1, 1, 1]) => (0, e.defaultData)(r, {
    enabled: !0,
    type: "Color",
    color: n
  });
  function t(r, n) {
    if (n === void 0)
      return r;
    const { dash: a, fill: s, ...i } = n;
    return r = _e(r, i), r = Ne(r, "dash", a), s !== void 0 && (r = { ...r, fill: r.fill ? jt.applyState(r.fill, s) : void 0 }), r;
  }
  e.applyState = t, e.statefulKeys = ["thickness"], e.fillStatefulKeys = [
    "color",
    "opacity",
    "start",
    "end"
  ], e.stopsStatefulKeys = ["color", "stop"];
})(je || (je = {}));
((e) => {
  function t(a = "Color") {
    switch (a) {
      case "Image":
        return {
          enabled: !0,
          type: "Image",
          image: null,
          opacity: 1
        };
      case "Gradient":
        return {
          enabled: !0,
          type: "Gradient",
          gradientType: er.Linear,
          stops: Ge.default_stops(),
          isSmooth: !1,
          opacity: 1,
          start: [0, 0.5],
          end: [1, 0.5],
          aspectRadius: 1
        };
      case "Color":
      default:
        return {
          enabled: !0,
          type: "Color",
          color: [0, 0, 0, 1]
        };
    }
  }
  e.defaultData = t;
  function r(a, s) {
    return {
      enabled: !0,
      type: "Gradient",
      gradientType: er.Linear,
      stops: Ge.default_stops(a, s),
      isSmooth: !1,
      opacity: 1,
      start: [0, 0.5],
      end: [1, 0.5],
      aspectRadius: 1
    };
  }
  e.defaultGradientData = r;
  function n(a, s) {
    if (s === void 0)
      return a;
    const { stops: i, ...l } = s;
    return a.type === "Gradient" && (a = kt(a, "stops", Ni(a.stops, i, _e))), a = _e(a, l), a;
  }
  e.applyState = n, e.statefulKeys = ["color", "opacity", "start", "end"];
})(jt || (jt = {}));
const oc = (e) => (w(e), o(e, !1, "position", I.check, !1), o(e, !1, "rotation", u, !1), o(e, !1, "is3d", $, !1, !1), o(e, !1, "flatten3d", $, !1, !1), o(
  e,
  !1,
  "rotation3d",
  pe.check,
  !1,
  Bt.default_rotation3d()
), o(e, !1, "depth3d", u, !1, 0), o(e, !1, "perspective3d", u, !1, 500), o(e, !1, "backface", $, !1, !0), o(e, !1, "scale", I.check, !1), o(e, !1, "shear", I.check, !1), o(e, !1, "pivot", I.check, !1), o(e, !1, "pivotRotation", u, !1, 0), e);
var Bt;
((e) => {
  e.check = oc;
})(Bt || (Bt = {}));
const bd = (e) => (w(e), o(e, !0, "position", I.check, !1), o(e, !0, "rotation", u, !1), o(e, !0, "rotation3d", pe.check, !1), o(e, !0, "depth3d", u, !1), o(e, !0, "perspective3d", u, !1), o(e, !0, "scale", I.check, !1), o(e, !0, "shear", I.check, !1), e);
function gd() {
  return {
    position: void 0,
    rotation: void 0,
    rotation3d: void 0,
    depth3d: void 0,
    perspective3d: void 0,
    scale: void 0,
    shear: void 0
  };
}
var Ms;
((e) => {
  e.check = bd, e.defaultData = gd;
})(Ms || (Ms = {}));
const wd = (e) => (w(e), o(e, !0, "position", I.check, !1), o(e, !0, "rotation", u, !1), o(e, !0, "is3d", $, !1), o(e, !0, "flatten3d", $, !1), o(e, !0, "rotation3d", pe.check, !1), o(e, !0, "depth3d", u, !1), o(e, !0, "perspective3d", u, !1), o(e, !0, "backface", $, !1), o(e, !0, "scale", I.check, !1), o(e, !0, "shear", I.check, !1), o(e, !0, "pivot", I.check, !1), o(e, !0, "pivotRotation", u, !1), e);
function yd() {
  return {
    position: void 0,
    rotation: void 0,
    is3d: void 0,
    flatten3d: void 0,
    rotation3d: void 0,
    depth3d: void 0,
    perspective3d: void 0,
    backface: void 0,
    scale: void 0,
    shear: void 0,
    pivot: void 0,
    pivotRotation: void 0
  };
}
var Ls;
((e) => {
  e.check = wd, e.defaultData = yd;
})(Ls || (Ls = {}));
var an = /* @__PURE__ */ ((e) => (e.World = "World", e.Tangent = "Tangent", e))(an || {});
const vd = [
  "World",
  "Tangent"
  /* Tangent */
], md = (e) => {
  if (!vd.includes(e))
    throw new Error("Invalid value for PathAlignOrientation");
  return e;
};
((e) => {
  e.check = md;
})(an || (an = {}));
const ic = (e) => (w(e), o(e, !0, "object", K.check, !1), o(e, !1, "orientation", an.check, !1), o(e, !1, "offset", u, !1), o(e, !1, "slide", u, !1), e);
var tr;
((e) => {
  e.check = ic;
})(tr || (tr = {}));
const kd = (e) => (w(e), o(e, !0, "offset", u, !1), o(e, !0, "slide", u, !1), e);
function Sd() {
  return {
    offset: void 0,
    slide: void 0
  };
}
var zs;
((e) => {
  e.check = kd, e.defaultData = Sd;
})(zs || (zs = {}));
const Ad = (e) => (w(e), o(e, !0, "object", K.check, !1), o(e, !0, "orientation", an.check, !1), o(e, !0, "offset", u, !1), o(e, !0, "slide", u, !1), e);
function xd() {
  return {
    object: void 0,
    orientation: void 0,
    offset: void 0,
    slide: void 0
  };
}
var Fs;
((e) => {
  e.check = Ad, e.defaultData = xd;
})(Fs || (Fs = {}));
var sn = /* @__PURE__ */ ((e) => (e.Left = "Left", e.Right = "Right", e.LeftAndRight = "LeftAndRight", e.Center = "Center", e.Scale = "Scale", e))(sn || {});
const Od = [
  "Left",
  "Right",
  "LeftAndRight",
  "Center",
  "Scale"
  /* Scale */
], Ed = (e) => {
  if (!Od.includes(e))
    throw new Error("Invalid value for ConstraintHorizontal");
  return e;
};
((e) => {
  e.check = Ed;
})(sn || (sn = {}));
var on = /* @__PURE__ */ ((e) => (e.Top = "Top", e.Bottom = "Bottom", e.TopAndBottom = "TopAndBottom", e.Center = "Center", e.Scale = "Scale", e))(on || {});
const Dd = [
  "Top",
  "Bottom",
  "TopAndBottom",
  "Center",
  "Scale"
  /* Scale */
], Pd = (e) => {
  if (!Dd.includes(e))
    throw new Error("Invalid value for ConstraintVertical");
  return e;
};
((e) => {
  e.check = Pd;
})(on || (on = {}));
var cn = /* @__PURE__ */ ((e) => (e.Static = "Static", e.Absolute = "Absolute", e))(cn || {});
const Id = [
  "Static",
  "Absolute"
  /* Absolute */
], Cd = (e) => {
  if (!Id.includes(e))
    throw new Error("Invalid value for LayoutType");
  return e;
};
((e) => {
  e.check = Cd;
})(cn || (cn = {}));
var Mt = /* @__PURE__ */ ((e) => (e.Fixed = "Fixed", e.Fill = "Fill", e.Hug = "Hug", e))(Mt || {});
const $d = [
  "Fixed",
  "Fill",
  "Hug"
  /* Hug */
], Rd = (e) => {
  if (!$d.includes(e))
    throw new Error("Invalid value for ResizeType");
  return e;
};
((e) => {
  e.check = Rd;
})(Mt || (Mt = {}));
var ln = /* @__PURE__ */ ((e) => (e.Normal = "Normal", e.Multiply = "Multiply", e.Screen = "Screen", e.Overlay = "Overlay", e.Darken = "Darken", e.Lighten = "Lighten", e.Difference = "Difference", e.Exclusion = "Exclusion", e.LinearDodge = "LinearDodge", e.Subtract = "Subtract", e.Divide = "Divide", e))(ln || {});
const Td = [
  "Normal",
  "Multiply",
  "Screen",
  "Overlay",
  "Darken",
  "Lighten",
  "Difference",
  "Exclusion",
  "LinearDodge",
  "Subtract",
  "Divide"
  /* Divide */
], Ud = (e) => {
  if (!Td.includes(e))
    throw new Error("Invalid value for BlendModeData");
  return e;
};
((e) => {
  e.check = Ud;
})(ln || (ln = {}));
const jd = (e) => (w(e), o(e, !1, "visible", $, !1, !0), o(e, !1, "raycastLock", $, !1, !1), o(e, !1, "eventsPassthrough", $, !1, !1), o(e, !1, "mask", $, !1, !1), o(e, !1, "name", se, !1, ""), o(e, !1, "transform", Bt.check, !0), o(
  e,
  !1,
  "horizontalConstraint",
  sn.check,
  !1,
  "Left"
  /* Left */
), o(
  e,
  !1,
  "verticalConstraint",
  on.check,
  !1,
  "Top"
  /* Top */
), o(e, !1, "events", ve.check(Jt.check), !1), o(e, !1, "opacity", u, !1, 1), o(
  e,
  !1,
  "blendMode",
  ln.check,
  !1,
  "Normal"
  /* Normal */
), o(e, !1, "effects", ve.check(ke.check), !1), o(e, !1, "states", ve.check(ma.check), !1), o(e, !0, "pathAlign", tr.check, !1), o(
  e,
  !1,
  "layoutType",
  cn.check,
  !1,
  "Absolute"
  /* Absolute */
), o(
  e,
  !1,
  "horizontalResizeType",
  Mt.check,
  !1,
  "Fixed"
  /* Fixed */
), o(
  e,
  !1,
  "verticalResizeType",
  Mt.check,
  !1,
  "Fixed"
  /* Fixed */
), e);
var va;
((e) => {
  e.check = jd;
})(va || (va = {}));
const Bd = (e) => (w(e), o(e, !1, "name", se, !1), o(e, !1, "transform", Ms.check, !0), o(e, !0, "opacity", u, !1), o(e, !0, "effects", Q.check(Ss.check), !1), o(e, !0, "pathAlign", zs.check, !1), e);
var Vs;
((e) => {
  e.check = Bd;
})(Vs || (Vs = {}));
const Md = (e) => (w(e), o(e, !0, "visible", $, !1), o(e, !0, "raycastLock", $, !1), o(e, !0, "eventsPassthrough", $, !1), o(e, !0, "mask", $, !1), o(e, !0, "name", se, !1), o(e, !1, "transform", Ls.check, !0), o(e, !0, "horizontalConstraint", sn.check, !1), o(e, !0, "verticalConstraint", on.check, !1), o(e, !0, "events", ve.check(Jt.check), !1), o(e, !0, "opacity", u, !1), o(e, !0, "blendMode", ln.check, !1), o(e, !0, "effects", ve.check(ke.check), !1), o(e, !0, "states", ve.check(ma.check), !1), o(e, !0, "pathAlign", Fs.check, !1), o(e, !0, "layoutType", cn.check, !1), o(e, !0, "horizontalResizeType", Mt.check, !1), o(e, !0, "verticalResizeType", Mt.check, !1), e);
var Ns;
((e) => {
  e.check = Md;
})(Ns || (Ns = {}));
const cc = (e) => (w(e), o(e, !1, "base", va.check, !0), e);
var fn;
((e) => {
  e.check = cc;
})(fn || (fn = {}));
const lc = (e) => (w(e), o(e, !1, "base", va.check, !0), o(e, !1, "shape", pt.check, !1), o(e, !1, "fill", V(xe.check), !1, null), o(e, !1, "fills", V(Q.check(xe.check)), !1, null), o(e, !1, "stroke", V(je.check), !1), e);
var un;
((e) => {
  e.check = lc;
})(un || (un = {}));
const Ld = (e) => {
  switch (w(e), e.type) {
    case "Shape":
      return C(e, "Shape", un.check);
    case "Group":
      return C(e, "Group", fn.check);
    default:
      throw new Error("Invalid type for ObjectData");
  }
};
var rr;
((e) => {
  e.check = Ld;
})(rr || (rr = {}));
const fc = (e) => (w(e), o(e, !1, "base", Vs.check, !0), o(e, !0, "shape", Rs.check, !1), o(e, !0, "fill", la.check, !1), o(e, !0, "fills", Q.check(la.check), !1), o(e, !0, "stroke", js.check, !1), e);
var ma;
((e) => {
  e.check = fc;
})(ma || (ma = {}));
const zd = (e) => (w(e), o(e, !1, "base", Ns.check, !0), o(e, !0, "shape", pt.check, !1), o(e, !0, "fill", V(xe.check), !1), o(e, !0, "fills", V(Q.check(xe.check)), !1), o(e, !0, "stroke", V(je.check), !1), e);
var ka;
((e) => {
  e.check = zd;
})(ka || (ka = {}));
_t(Bt, (e) => {
  const t = e;
  if (t.position) {
    const r = Vi(t.position);
    mt(r, t.position) || (t.position = r);
  }
  return oc(t);
});
((e) => {
  e.identity = {
    position: [0, 0],
    rotation: 0,
    is3d: !1,
    flatten3d: !1,
    rotation3d: [0, 0, 0],
    depth3d: 0,
    perspective3d: 500,
    backface: !0,
    scale: [1, 1],
    shear: [0, 0],
    pivot: [0, 0],
    pivotRotation: 0
  };
  function t(a, s) {
    return {
      position: s?.position || a.position,
      rotation: s?.rotation || a.rotation,
      is3d: s?.is3d || a.is3d,
      flatten3d: s?.flatten3d || a.flatten3d,
      rotation3d: s?.rotation3d || a.rotation3d,
      depth3d: s?.depth3d || a.depth3d,
      perspective3d: s?.perspective3d || a.perspective3d,
      backface: s?.backface || a.backface,
      scale: s?.scale || a.scale,
      shear: s?.shear || a.shear,
      pivot: s?.pivot || a.pivot,
      pivotRotation: s?.pivotRotation || a.pivotRotation
    };
  }
  e.merge = t;
  function r(a, s) {
    return Hl({
      position: mt(a.position, s.position) ? void 0 : s.position,
      rotation: Dn(a.rotation, s.rotation) ? void 0 : s.rotation,
      is3d: a.is3d === s.is3d ? void 0 : s.is3d,
      rotation3d: mt(a.rotation3d, s.rotation3d) ? void 0 : s.rotation3d,
      depth3d: Dn(a.depth3d, s.depth3d) ? void 0 : s.depth3d,
      perspective3d: Dn(a.perspective3d, s.perspective3d) ? void 0 : s.perspective3d,
      backface: a.backface === s.backface ? void 0 : s.backface,
      scale: mt(a.scale, s.scale) ? void 0 : s.scale,
      shear: mt(a.shear, s.shear) ? void 0 : s.shear,
      pivot: mt(a.pivot, s.pivot) ? void 0 : s.pivot
    });
  }
  e.diff = r;
  function n() {
    return [0, 0, 0];
  }
  e.default_rotation3d = n;
})(Bt || (Bt = {}));
((e) => {
  function t(s, i) {
    if (i === void 0)
      return s;
    const l = s.states.data(i);
    return l === void 0 ? s : r(s, l);
  }
  e.applyStateFromData = t;
  function r(s, i) {
    if (i === void 0)
      return s;
    const {
      name: l,
      effects: f,
      pathAlign: p,
      shape: g,
      stroke: y,
      fill: S,
      fills: U,
      opacity: j,
      ...P
    } = i, B = Gl(s.effects, f, ke.applyState);
    switch (s.type) {
      case "Shape":
        return s = _e(s, P), s = kt(s, "opacity", j), s = kt(s, "effects", B), s = Kl(
          s,
          "stroke",
          y,
          (R, N) => R == null ? null : je.applyState(R, N)
        ), s = Ne(s, "pathAlign", p), s.fill !== null && (s = kt(s, "fill", xe.applyState(s.fill, S))), s = Ne(s, "shape", g), s;
      case "Group":
        return s = _e(s, P), s = kt(s, "opacity", j), s = kt(s, "effects", B), s = Ne(s, "pathAlign", p), s;
    }
  }
  e.applyState = r;
  function n(s, i) {
    return Vl(s, i);
  }
  e.toDiff = n, e.statefulKeys = [
    "position",
    "rotation",
    "rotation3d",
    "depth3d",
    "perspective3d",
    "scale",
    "shear",
    "opacity"
  ], e.statefulSimpleContainerKeys = [
    "shape",
    "fill",
    "stroke",
    "pathAlign"
  ], e.statefulSimpleContainer2Keys = ["dash", "fill"];
  function a(s, i, l) {
    function f(p, g) {
      if (p.type === ee.Update) {
        const [y, S] = Nl(p.props, g), U = [];
        let j = s;
        if (y !== void 0) {
          const P = [];
          if (ie.zoom(s, p.path) === void 0) {
            const B = p.path[0], R = p.path[1], N = p.path[2], oe = p.path[3];
            e.statefulSimpleContainerKeys.includes(B) ? (ie.zoom(s, [B]) === void 0 && P.push({ type: ee.Update, path: [], props: { [B]: {} } }), R !== void 0 && e.statefulSimpleContainer2Keys.includes(R) && P.push({ type: ee.Update, path: [B], props: { [R]: {} } }), B == "fill" && R === "stops" && (ie.zoom(s, [B, R]) === void 0 && P.push({
              type: ee.Update,
              path: [B],
              props: { [R]: new ye() }
            }), ie.zoom(s, [B, R, N]) === void 0 && P.push({
              type: de.Add,
              path: [B, R],
              id: N,
              data: {}
            })), R == "fill" && N === "stops" && (ie.zoom(s, [B, R, N]) === void 0 && P.push({
              type: ee.Update,
              path: [B, R],
              props: { [N]: new ye() }
            }), ie.zoom(s, [B, R, N, oe]) === void 0 && P.push({
              type: de.Add,
              path: [B, R, N],
              id: oe,
              data: {}
            }))) : B === "effects" && (ie.zoom(s, [B]) === void 0 && P.push({
              type: ee.Update,
              path: [],
              props: { [B]: new ye() }
            }), ie.zoom(s, [B, R]) === void 0 && P.push({ type: de.Add, path: [B], id: R, data: {} }), ie.zoom(s, [B, R, N]) === void 0 && ke.statefulContainers.includes(N) && P.push({
              type: ee.Update,
              path: [B, R],
              props: { [N]: {} }
            }), ie.zoom(s, [B, R, N, oe]) === void 0 && ke.statefulNestedContainers.includes(oe) && P.push({
              type: ee.Update,
              path: [B, R, N],
              props: { [oe]: {} }
            }));
          }
          P.push({ ...p, props: y }), j = Fn.apply(s, P)?.data ?? s, fc(j);
          for (const B of P)
            U.push({ ...B, path: ["states", l, ...B.path] });
        }
        return S !== void 0 && U.push({ ...p, props: S }), [j, U];
      } else
        return [s, [p]];
    }
    if (i.type === ee.Update) {
      if (i.path.length === 0)
        return f(i, e.statefulKeys);
      if (Te(i.path, ["pathAlign"]))
        return f(i, tr.statefulKeys);
      if (Te(i.path, ["stroke"]))
        return f(i, je.statefulKeys);
      if (Te(i.path, ["stroke", "dash"]))
        return f(i, Ut.statefulKeys);
      if (Te(i.path, ["stroke", "fill"]))
        return f(i, je.fillStatefulKeys);
      if (Te(i.path, ["stroke", "fill", "stops", "*"]))
        return f(i, je.stopsStatefulKeys);
      if (Te(i.path, ["fill"]))
        return f(i, xe.statefulKeys);
      if (Te(i.path, ["fill", "stops", "*"]))
        return f(i, xe.stopsStatefulKeys);
      if (Te(i.path, ["shape"]))
        return f(i, pt.statefulKeys);
      if (Te(i.path, ["effects", "*"]))
        return f(i, ke.statefulKeys);
      for (const p of ke.statefulContainers)
        if (Te(i.path, ["effects", "*", p]))
          return f(i, ke.statefulContainerKeys[p] || []);
      for (const p of ke.statefulNestedContainers)
        if (Te(i.path, ["effects", "*", "*", p]))
          return f(i, ke.statefulNestedContainerKeys[p] || []);
    }
    return [s, [i]];
  }
  e.transformOp = a;
})(rr || (rr = {}));
((e) => {
  function t(r) {
    const n = {
      shape: pt.defaultData(r),
      fill: xe.defaultData(),
      fills: null,
      stroke: null,
      visible: !0,
      raycastLock: !1,
      eventsPassthrough: !1,
      mask: !1,
      name: "Shape",
      horizontalConstraint: "Left",
      verticalConstraint: "Top",
      events: [],
      opacity: 1,
      blendMode: "Normal",
      effects: [],
      states: [],
      position: [0, 0],
      rotation: 0,
      is3d: !1,
      flatten3d: !1,
      rotation3d: [0, 0, 0],
      depth3d: 0,
      perspective3d: 350,
      backface: !0,
      scale: [1, 1],
      shear: [0, 0],
      pivot: [0, 0],
      pivotRotation: 0,
      layoutType: "Absolute",
      verticalResizeType: "Fixed",
      horizontalResizeType: "Fixed"
      /* Fixed */
    };
    return lc(n);
  }
  e.defaultData = t;
})(un || (un = {}));
((e) => {
  function t() {
    return cc({
      visible: !0,
      raycastLock: !1,
      eventsPassthrough: !1,
      mask: !1,
      name: "Group",
      horizontalConstraint: "Left",
      verticalConstraint: "Top",
      events: [],
      opacity: 1,
      blendMode: "Normal",
      effects: [],
      states: [],
      position: [0, 0],
      rotation: 0,
      is3d: !1,
      flatten3d: !1,
      rotation3d: [0, 0, 0],
      depth3d: 0,
      perspective3d: 350,
      backface: !0,
      scale: [1, 1],
      shear: [0, 0],
      pivot: [0, 0],
      pivotRotation: 0,
      layoutType: "Absolute",
      verticalResizeType: "Fixed",
      horizontalResizeType: "Fixed"
      /* Fixed */
    });
  }
  e.defaultData = t;
})(fn || (fn = {}));
((e) => {
  function t() {
    return ic({
      orientation: "Tangent",
      offset: 0,
      slide: 0
    });
  }
  e.defaultData = t, e.statefulKeys = ["offset", "slide"];
})(tr || (tr = {}));
const Fd = (e) => (w(e), o(e, !1, "counters", Q.check(Ws.check), !1), o(e, !1, "randoms", Q.check(Ks.check), !1), o(e, !1, "timers", Q.check(qs.check), !1), o(e, !1, "times", Q.check(Gs.check), !1), e);
var Hs;
((e) => {
  e.check = Fd;
})(Hs || (Hs = {}));
const Vd = (e) => (w(e), o(e, !1, "name", se, !1, ""), o(e, !1, "startValue", u, !1), o(e, !1, "increment", u, !1), o(e, !1, "updateInterval", u, !1), o(e, !1, "endValue", V(u), !1), o(e, !1, "repeat", V($), !1), e);
var Ws;
((e) => {
  e.check = Vd;
})(Ws || (Ws = {}));
const Nd = (e) => (w(e), o(e, !1, "name", se, !1, ""), o(e, !1, "updateInterval", u, !1), o(e, !1, "min", u, !1), o(e, !1, "max", u, !1), o(e, !1, "decimals", Je, !1), e);
var Ks;
((e) => {
  e.check = Nd;
})(Ks || (Ks = {}));
var Sa = /* @__PURE__ */ ((e) => (e.HhMmSs = "HhMmSs", e.HhMm = "HhMm", e.Hh = "Hh", e.Mm = "Mm", e.Ss = "Ss", e.Year = "Year", e.Month = "Month", e.DayOfYear = "DayOfYear", e.DayOfMonth = "DayOfMonth", e.SecondOfDay = "SecondOfDay", e))(Sa || {});
const Hd = [
  "HhMmSs",
  "HhMm",
  "Hh",
  "Mm",
  "Ss",
  "Year",
  "Month",
  "DayOfYear",
  "DayOfMonth",
  "SecondOfDay"
  /* SecondOfDay */
], Wd = (e) => {
  if (!Hd.includes(e))
    throw new Error("Invalid value for TimeFormat");
  return e;
};
((e) => {
  e.check = Wd;
})(Sa || (Sa = {}));
var Aa = /* @__PURE__ */ ((e) => (e._12 = "_12", e._12Ampm = "_12Ampm", e._24 = "_24", e))(Aa || {});
const Kd = [
  "_12",
  "_12Ampm",
  "_24"
  /* _24 */
], Gd = (e) => {
  if (!Kd.includes(e))
    throw new Error("Invalid value for TimeFormat12h24h");
  return e;
};
((e) => {
  e.check = Gd;
})(Aa || (Aa = {}));
const qd = (e) => (w(e), o(e, !1, "name", se, !1, ""), o(e, !1, "format", Sa.check, !1), o(e, !1, "format12h24h", Aa.check, !1), o(e, !1, "timeZone", V(se), !1), e);
var Gs;
((e) => {
  e.check = qd;
})(Gs || (Gs = {}));
var xa = /* @__PURE__ */ ((e) => (e.Timer = "Timer", e.Stopwatch = "Stopwatch", e))(xa || {});
const Zd = [
  "Timer",
  "Stopwatch"
  /* Stopwatch */
], Yd = (e) => {
  if (!Zd.includes(e))
    throw new Error("Invalid value for TimerMode");
  return e;
};
((e) => {
  e.check = Yd;
})(xa || (xa = {}));
const Jd = (e) => {
  switch (w(e), e.type) {
    case "HhMmSs":
      return We(e, "HhMmSs", pe.check), e;
    case "MmSs":
      return We(e, "MmSs", I.check), e;
    case "Number":
      return We(e, "Number", u), e;
    case "Number3Decimal":
      return We(e, "Number3Decimal", u), e;
    default:
      throw new Error("Invalid type for TimerValue");
  }
};
var Oa;
((e) => {
  e.check = Jd;
})(Oa || (Oa = {}));
const Qd = (e) => (w(e), o(e, !1, "name", se, !1, ""), o(e, !1, "mode", xa.check, !1), o(e, !1, "startValue", Oa.check, !1), o(e, !1, "endValue", Oa.check, !1), o(e, !1, "hasEnd", $, !1), o(e, !1, "repeat", $, !1), e);
var qs;
((e) => {
  e.check = Qd;
})(qs || (qs = {}));
const Xd = (e) => (w(e), o(e, !1, "data", Zt.check, !1), e);
var Zs;
((e) => {
  e.check = Xd;
})(Zs || (Zs = {}));
const Ys = (e) => (w(e), o(e, !1, "data", Zt.check, !1), e);
var ei;
((e) => {
  e.check = Ys;
})(ei || (ei = {}));
const eh = (e) => (w(e), o(e, !1, "filename", se, !1), o(e, !1, "data", rs.check, !1), o(e, !1, "mimeType", se, !1), e);
var Js;
((e) => {
  e.check = eh;
})(Js || (Js = {}));
const th = (e) => (w(e), o(e, !1, "data", Zt.check, !1), o(e, !1, "thumbnail", Zt.check, !1), e);
var Qs;
((e) => {
  e.check = th;
})(Qs || (Qs = {}));
var Ea = /* @__PURE__ */ ((e) => (e.Vector = "Vector", e.Quaternion = "Quaternion", e))(Ea || {});
const rh = [
  "Vector",
  "Quaternion"
  /* Quaternion */
], nh = (e) => {
  if (!rh.includes(e))
    throw new Error("Invalid value for TrackType");
  return e;
};
((e) => {
  e.check = nh;
})(Ea || (Ea = {}));
const ah = (e) => (w(e), o(e, !1, "type", Ea.check, !1), o(e, !1, "name", se, !1), o(e, !1, "times", zr(u), !1), o(e, !1, "values", zr(u), !1), e);
var Xs;
((e) => {
  e.check = ah;
})(Xs || (Xs = {}));
const sh = (e) => (w(e), o(e, !1, "duration", u, !1), o(e, !1, "tracks", zr(Xs.check), !1), e);
var eo;
((e) => {
  e.check = sh;
})(eo || (eo = {}));
function oh(e) {
  return (t) => (w(t), o(t, !1, "name", se, !1), o(t, !1, "data", e, !1), o(t, !1, "persistent", $, !1, !1), t);
}
var Ue;
((e) => {
  e.check = oh;
})(Ue || (Ue = {}));
const ih = (e) => (w(e), o(e, !1, "colors", Q.check(Ue.check(Se.check)), !1), o(e, !1, "numbers", Q.check(Ue.check(u)), !1), o(e, !1, "booleans", Q.check(Ue.check($)), !1), o(e, !1, "strings", Q.check(Ue.check(se)), !1), o(e, !1, "dynamicVariables", Hs.check, !1), o(e, !1, "fonts", Q.check(Ue.check(ro.check)), !1), o(e, !1, "animations", Q.check(Ue.check(eo.check)), !1), o(e, !1, "audios", Q.check(Ue.check(Js.check)), !1), o(e, !1, "images", Q.check(Ue.check(Zs.check)), !1), o(e, !1, "videos", Q.check(Ue.check(Qs.check)), !1), e);
var to;
((e) => {
  e.check = ih;
})(to || (to = {}));
var ro;
((e) => {
  e.check = (t) => t instanceof Uint8Array || typeof t == "string" || typeof t == "object" && t instanceof Kt ? Ys({ data: wo(t) }) : Ys(t);
})(ro || (ro = {}));
const ch = (e) => (w(e), o(e, !1, "name", se, !1, "Page"), o(e, !1, "backgroundColor", Se.check, !1), o(e, !1, "objects", Wn.check(rr.check), !1), e);
var no;
((e) => {
  e.check = ch;
})(no || (no = {}));
const lh = (e) => (w(e), o(e, !0, "backgroundColor", Se.check, !1), e);
function fh() {
  return {
    backgroundColor: void 0
  };
}
var ao;
((e) => {
  e.check = lh, e.defaultData = fh;
})(ao || (ao = {}));
const uh = (e) => (w(e), o(e, !1, "schema", V(Je), !1), e);
var ti;
((e) => {
  e.check = uh;
})(ti || (ti = {}));
var nr = /* @__PURE__ */ ((e) => (e.Cover = "Cover", e.Contain = "Contain", e.Actual = "Actual", e.Responsive = "Responsive", e))(nr || {});
const dh = [
  "Cover",
  "Contain",
  "Actual",
  "Responsive"
  /* Responsive */
], hh = (e) => {
  if (!dh.includes(e))
    throw new Error("Invalid value for PresentationSizing");
  return e;
};
((e) => {
  e.check = hh;
})(nr || (nr = {}));
var Da = /* @__PURE__ */ ((e) => (e.png = "png", e.jpg = "jpg", e))(Da || {});
const ph = [
  "png",
  "jpg"
  /* jpg */
], _h = (e) => {
  if (!ph.includes(e))
    throw new Error("Invalid value for ImageFormat");
  return e;
};
((e) => {
  e.check = _h;
})(Da || (Da = {}));
var Pa = /* @__PURE__ */ ((e) => (e.mp4 = "mp4", e.webm = "webm", e.png = "png", e.jpg = "jpg", e))(Pa || {});
const bh = [
  "mp4",
  "webm",
  "png",
  "jpg"
  /* jpg */
], gh = (e) => {
  if (!bh.includes(e))
    throw new Error("Invalid value for VideoFormat");
  return e;
};
((e) => {
  e.check = gh;
})(Pa || (Pa = {}));
const wh = (e) => (w(e), o(e, !1, "logo", $, !1, !0), o(
  e,
  !1,
  "presentationSizing",
  nr.check,
  !1,
  "Contain"
  /* Contain */
), o(e, !1, "allowPageScroll", $, !1, !0), o(e, !1, "showBackground", $, !1, !0), o(e, !0, "startFrame", K.check, !1), e);
function yh() {
  return {
    logo: !0,
    presentationSizing: "Contain",
    allowPageScroll: !0,
    showBackground: !0,
    startFrame: void 0
  };
}
var so;
((e) => {
  e.check = wh, e.defaultData = yh;
})(so || (so = {}));
const vh = (e) => (w(e), o(
  e,
  !1,
  "presentationSizing",
  nr.check,
  !1,
  "Contain"
  /* Contain */
), o(e, !1, "allowPageScroll", $, !1, !0), o(e, !1, "showBackground", $, !1, !0), o(
  e,
  !1,
  "imageFormat",
  Da.check,
  !1,
  "png"
  /* png */
), o(e, !1, "imageRatio", Je, !1, 1), o(e, !1, "videoRatio", Je, !1, 1), o(e, !1, "videoFps", Je, !1, 60), o(e, !1, "videoDuration", u, !1, 1), o(
  e,
  !1,
  "videoFormat",
  Pa.check,
  !1,
  "mp4"
  /* mp4 */
), e);
function mh() {
  return {
    presentationSizing: "Contain",
    allowPageScroll: !0,
    showBackground: !0,
    imageFormat: "png",
    imageRatio: 1,
    videoRatio: 1,
    videoFps: 60,
    videoDuration: 1,
    videoFormat: "mp4"
    /* mp4 */
  };
}
var oo;
((e) => {
  e.check = vh, e.defaultData = mh;
})(oo || (oo = {}));
const uc = (e) => (w(e), o(e, !1, "schema", Je, !1), o(e, !1, "scenes", ve.check(no.check), !1), o(e, !1, "assets", to.check, !1), o(e, !1, "publish", so.check, !1), o(e, !1, "framePublish", Q.check(oo.check), !1, Q.new_()), e);
var Ia;
((e) => {
  e.check = uc;
})(Ia || (Ia = {}));
const kh = 11, Sh = "32603ebf4-bd9a-54ba-c1e9-6645c3ee7a53";
((e) => {
  e.defaultData = (t) => uc({
    schema: kh,
    scenes: [
      {
        fi: 0,
        id: Sh,
        data: {
          name: "Page",
          backgroundColor: t ?? [0.11, 0.11, 0.11, 1],
          objects: []
        }
      }
    ],
    assets: {
      images: {},
      videos: {},
      colors: {},
      audios: {},
      numbers: {},
      booleans: {},
      strings: {},
      dynamicVariables: {
        counters: {},
        randoms: {},
        timers: {},
        times: {}
      },
      fonts: {},
      animations: {}
    },
    publish: {
      logo: !0,
      presentationSizing: "Contain",
      allowPageScroll: !0,
      showBackground: !0
      // panTouches: 3,
    },
    framePublish: {}
  });
})(Ia || (Ia = {}));
function Ah(e) {
  let t = !1;
  return e.scenes.forEach((r) => {
    r.data.objects.traverse((n, a) => {
      a.visible && a.effects.forEach((s) => {
        s.data.enabled && s.data.type === "Mesh3dEffect" && (t = !0);
      });
    });
  }), t ? "hana3d.wasm" : "hana.wasm";
}
({
  ...Fn
});
const xh = (e) => (w(e), o(e, !0, "position", I.check, !1), o(e, !0, "zoom", u, !1), e);
function Oh() {
  return {
    position: void 0,
    zoom: void 0
  };
}
var ri;
((e) => {
  e.check = xh, e.defaultData = Oh;
})(ri || (ri = {}));
const Eh = (e) => (w(e), o(e, !0, "presentationSizing", nr.check, !1), e);
function Dh() {
  return {
    presentationSizing: void 0
  };
}
var ni;
((e) => {
  e.check = Eh, e.defaultData = Dh;
})(ni || (ni = {}));
const Ph = (e) => (w(e), o(e, !1, "scene", K.check, !1), o(e, !1, "parent", V(K.check), !1), o(e, !1, "object", Hn.check(rr.check), !1), e);
var io;
((e) => {
  e.check = Ph;
})(io || (io = {}));
const Ih = (e) => (w(e), o(e, !1, "scene", K.check, !1), o(e, !1, "id", K.check, !1), e);
var co;
((e) => {
  e.check = Ih;
})(co || (co = {}));
const Ch = (e) => (w(e), o(e, !1, "scene", K.check, !1), o(e, !1, "id", K.check, !1), o(e, !1, "parent", V(K.check), !1), o(e, !1, "fi", St, !1), e);
var lo;
((e) => {
  e.check = Ch;
})(lo || (lo = {}));
const $h = (e) => (w(e), o(e, !1, "scene", K.check, !1), o(e, !1, "id", K.check, !1), o(e, !1, "data", ka.check, !1), o(e, !1, "dataStateful", ka.check, !1), e);
var fo;
((e) => {
  e.check = $h;
})(fo || (fo = {}));
const Rh = (e) => (w(e), o(e, !1, "scene", K.check, !1), o(e, !1, "data", ao.check, !1), e);
var uo;
((e) => {
  e.check = Rh;
})(uo || (uo = {}));
const Th = (e) => {
  switch (w(e), e.type) {
    case "AddObject":
      return C(e, "AddObject", io.check);
    case "DeleteObject":
      return C(e, "DeleteObject", co.check);
    case "MoveObject":
      return C(e, "MoveObject", lo.check);
    case "UpdateObject":
      return C(e, "UpdateObject", fo.check);
    case "UpdateScene":
      return C(e, "UpdateScene", uo.check);
    default:
      throw new Error("Invalid type for DocumentUpdate");
  }
};
var ai;
((e) => {
  e.check = Th;
})(ai || (ai = {}));
const Uh = (e) => (w(e), o(e, !1, "object", K.check, !1), o(e, !1, "state", V(K.check), !1), e);
var si;
((e) => {
  e.check = Uh;
})(si || (si = {}));
const jh = (e) => (w(e), o(e, !1, "data", ba.check, !1), o(e, !1, "offset", I.check, !1), e);
var oi;
((e) => {
  e.check = jh;
})(oi || (oi = {}));
function Bh(e) {
  if (!e) return !1;
  const t = e.getRootNode(), r = t instanceof ShadowRoot ? t.host : e, n = r.parentElement;
  if (!n || n.tagName !== "BODY") return !1;
  const a = [
    "DIV",
    "P",
    "SPAN",
    "SECTION",
    "ARTICLE",
    "HEADER",
    "FOOTER",
    "MAIN",
    "ASIDE",
    "NAV",
    "ADDRESS",
    "HGROUP"
  ];
  return Array.from(n.children).some(
    (s) => s !== r && a.includes(s.tagName)
  );
}
const Va = {};
function Mh(e = "") {
  return Va[e] || (Va[e] = Mi(e ? { module_or_path: e } : void 0)), Va[e];
}
Object.defineProperty(Et.prototype, "scene", {
  get: function () {
    const e = {};
    return Object.setPrototypeOf(e, Xa.prototype), e.__wbg_ptr = this.__wbg_ptr, e;
  }
});
var vr, ce, mr, kr, nt, Sr, Ar, xr, Vt, Nt, Pn, In, Or, Cn, $n, Er, Rn, Tn, Un, jn, Bn;
class Lh {
  constructor(t, r) {
    Ve(this, "canvas"), Ve(this, "unloadable", !1), Ve(this, "loading", "lazy"), re(this, vr, "local"), Ve(this, "data"), Ve(this, "wasmURL"), re(this, ce), re(this, mr), re(this, kr), re(this, nt, !1), re(this, Sr), re(this, Ar), re(this, xr), re(this, Vt, async () => {
      this.data && (Re(this, ce, await Et.create(this.canvas, this.data, !1)), D(this, ce).getDeviceLostPromise()?.wait().then(async (a) => {
        console.error("Device lost:", a), D(this, Nt).call(this), D(this, nt) && await D(this, Vt).call(this);
      }), this.resize(), D(this, ce).scene.present(this.data.publish.startFrame ?? null));
    }), re(this, Nt, () => {
      D(this, ce)?.free(), Re(this, ce, void 0);
    }), Ve(this, "resize", () => {
      const a = this.canvas.clientWidth, s = this.canvas.clientHeight;
      this.canvas.width = Math.ceil(a * window.devicePixelRatio), this.canvas.height = Math.ceil(s * window.devicePixelRatio), D(this, ce)?.resize([a, s], window.devicePixelRatio);
      const i = this.canvas.getBoundingClientRect();
      Re(this, Ar, i.top + window.scrollY), Re(this, xr, i.left + window.scrollX);
    }), re(this, Pn, () => {
      const a = this.eventsTarget === "global" ? window : this.canvas;
      this.canvas.addEventListener("pointerdown", D(this, Cn)), this.canvas.addEventListener("pointerup", D(this, $n)), a.addEventListener("pointermove", D(this, Er)), window.addEventListener("keydown", D(this, Rn)), window.addEventListener("keyup", D(this, Tn)), this.canvas.addEventListener("pointerenter", D(this, Un)), this.canvas.addEventListener("pointerleave", D(this, jn));
    }), re(this, In, () => {
      this.canvas.removeEventListener("pointerdown", D(this, Cn)), this.canvas.removeEventListener("pointerup", D(this, $n)), window.removeEventListener("pointermove", D(this, Er)), this.canvas.removeEventListener("pointermove", D(this, Er)), window.removeEventListener("keydown", D(this, Rn)), window.removeEventListener("keyup", D(this, Tn)), this.canvas.removeEventListener("pointerenter", D(this, Un)), this.canvas.removeEventListener("pointerleave", D(this, jn));
    }), re(this, Or, (a) => {
      const s = a.pageX - D(this, xr), i = a.pageY - D(this, Ar);
      return [s, i];
    }), re(this, Cn, (a) => {
      const s = D(this, Or).call(this, a);
      D(this, ce)?.scene.onPointerDown(s, a.pointerType === "touch", a.button);
    }), re(this, $n, (a) => {
      const s = D(this, Or).call(this, a);
      D(this, ce)?.scene.onPointerUp(s, a.pointerType === "touch", a.button);
    }), re(this, Er, (a) => {
      const s = a, i = D(this, Or).call(this, s);
      D(this, ce)?.scene.onPointerMove(i, s.pointerType === "touch", s.button);
    }), re(this, Rn, (a) => {
      D(this, ce)?.scene.onKeyDown(a.key);
    }), re(this, Tn, (a) => {
      D(this, ce)?.scene.onKeyUp(a.key);
    }), re(this, Un, () => {
      D(this, ce)?.scene.onPointerEnter(), this.resize();
    }), re(this, jn, () => {
      D(this, ce)?.scene.onPointerLeave();
    }), re(this, Bn, () => {
      Re(this, Sr, window.requestAnimationFrame(D(this, Bn))), D(this, nt) && D(this, ce)?.onFrame();
    }), this.canvas = t;
    const n = t.getBoundingClientRect();
    Re(this, Ar, n.top + window.scrollY), Re(this, xr, n.left + window.scrollX), r && (r.unloadable !== void 0 && (this.unloadable = r.unloadable), r.loading !== void 0 && (this.loading = r.loading), r.eventsTarget !== void 0 && (this.eventsTarget = r.eventsTarget), r.wasmURL !== void 0 && (this.wasmURL = r.wasmURL));
  }
  get eventsTarget() {
    return D(this, vr);
  }
  set eventsTarget(t) {
    D(this, vr) !== t && (Re(this, vr, t), D(this, In).call(this), D(this, Pn).call(this));
  }
  async load(t) {
    const r = await fetch(t);
    if (!r.ok)
      throw new Error(`Failed to fetch ${t}: ${r.statusText}`);
    const n = await r.arrayBuffer(), a = new Uint8Array(n);
    await this.start(a);
  }
  async start(t) {
    Array.isArray(t) && (t = new Uint8Array(t));
    const r = Ja.deserialize(t);
    this.data = r, await Mh(
      this.wasmURL ?? new URL(Ah(r), import.meta.url).toString()
    ), this.canvas.addEventListener("contextmenu", (a) => a.preventDefault()), r.publish.allowPageScroll || (this.canvas.addEventListener("wheel", (a) => a.preventDefault()), this.canvas.addEventListener("touchstart", (a) => a.preventDefault())), this.canvas.addEventListener("webglcontextlost", async () => {
      D(this, Nt).call(this), D(this, nt) && await D(this, Vt).call(this);
    }), D(this, Pn).call(this), Re(this, kr, new IntersectionObserver(
      async (a) => {
        const s = a[0];
        Re(this, nt, s.isIntersecting), D(this, nt) && D(this, ce) === void 0 && await D(this, Vt).call(this), !D(this, nt) && D(this, ce) !== void 0 && this.unloadable && D(this, Nt).call(this);
      },
      {
        rootMargin: "200px 0px 0px 0px"
      }
    )), D(this, kr).observe(this.canvas), Re(this, mr, new ResizeObserver(this.resize)), D(this, mr).observe(this.canvas);
    const n = !Bh(this.canvas);
    this.canvas.style.width = "100%", this.canvas.style.height = n ? "100vh" : "100%", this.loading === "eager" && await D(this, Vt).call(this), D(this, Bn).call(this);
  }
  dispose() {
    D(this, In).call(this), D(this, Nt).call(this), D(this, mr)?.disconnect(), D(this, kr)?.disconnect(), D(this, Sr) && window.cancelAnimationFrame(D(this, Sr));
  }
}
vr = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ new WeakMap(), mr = /* @__PURE__ */ new WeakMap(), kr = /* @__PURE__ */ new WeakMap(), nt = /* @__PURE__ */ new WeakMap(), Sr = /* @__PURE__ */ new WeakMap(), Ar = /* @__PURE__ */ new WeakMap(), xr = /* @__PURE__ */ new WeakMap(), Vt = /* @__PURE__ */ new WeakMap(), Nt = /* @__PURE__ */ new WeakMap(), Pn = /* @__PURE__ */ new WeakMap(), In = /* @__PURE__ */ new WeakMap(), Or = /* @__PURE__ */ new WeakMap(), Cn = /* @__PURE__ */ new WeakMap(), $n = /* @__PURE__ */ new WeakMap(), Er = /* @__PURE__ */ new WeakMap(), Rn = /* @__PURE__ */ new WeakMap(), Tn = /* @__PURE__ */ new WeakMap(), Un = /* @__PURE__ */ new WeakMap(), jn = /* @__PURE__ */ new WeakMap(), Bn = /* @__PURE__ */ new WeakMap();
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Mn = globalThis, Ao = Mn.ShadowRoot && (Mn.ShadyCSS === void 0 || Mn.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, xo = Symbol(), ii = /* @__PURE__ */ new WeakMap();
let dc = class {
  constructor(t, r, n) {
    if (this._$cssResult$ = !0, n !== xo) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (Ao && t === void 0) {
      const n = r !== void 0 && r.length === 1;
      n && (t = ii.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && ii.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const zh = (e) => new dc(typeof e == "string" ? e : e + "", void 0, xo), Fh = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((n, a, s) => n + ((i) => {
    if (i._$cssResult$ === !0) return i.cssText;
    if (typeof i == "number") return i;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + i + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(a) + e[s + 1], e[0]);
  return new dc(r, e, xo);
}, Vh = (e, t) => {
  if (Ao) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const n = document.createElement("style"), a = Mn.litNonce;
    a !== void 0 && n.setAttribute("nonce", a), n.textContent = r.cssText, e.appendChild(n);
  }
}, ci = Ao ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const n of t.cssRules) r += n.cssText;
  return zh(r);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Nh, defineProperty: Hh, getOwnPropertyDescriptor: Wh, getOwnPropertyNames: Kh, getOwnPropertySymbols: Gh, getPrototypeOf: qh } = Object, ct = globalThis, li = ct.trustedTypes, Zh = li ? li.emptyScript : "", Yh = ct.reactiveElementPolyfillSupport, Cr = (e, t) => e, Ca = {
  toAttribute(e, t) {
    switch (t) {
      case Boolean:
        e = e ? Zh : null;
        break;
      case Object:
      case Array:
        e = e == null ? e : JSON.stringify(e);
    }
    return e;
  }, fromAttribute(e, t) {
    let r = e;
    switch (t) {
      case Boolean:
        r = e !== null;
        break;
      case Number:
        r = e === null ? null : Number(e);
        break;
      case Object:
      case Array:
        try {
          r = JSON.parse(e);
        } catch {
          r = null;
        }
    }
    return r;
  }
}, Oo = (e, t) => !Nh(e, t), fi = { attribute: !0, type: String, converter: Ca, reflect: !1, useDefault: !1, hasChanged: Oo };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ct.litPropertyMetadata ?? (ct.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Ht = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = fi) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const n = Symbol(), a = this.getPropertyDescriptor(t, n, r);
      a !== void 0 && Hh(this.prototype, t, a);
    }
  }
  static getPropertyDescriptor(t, r, n) {
    const { get: a, set: s } = Wh(this.prototype, t) ?? {
      get() {
        return this[r];
      }, set(i) {
        this[r] = i;
      }
    };
    return {
      get: a, set(i) {
        const l = a?.call(this);
        s?.call(this, i), this.requestUpdate(t, l, n);
      }, configurable: !0, enumerable: !0
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? fi;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Cr("elementProperties"))) return;
    const t = qh(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Cr("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Cr("properties"))) {
      const r = this.properties, n = [...Kh(r), ...Gh(r)];
      for (const a of n) this.createProperty(a, r[a]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const r = litPropertyMetadata.get(t);
      if (r !== void 0) for (const [n, a] of r) this.elementProperties.set(n, a);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, n] of this.elementProperties) {
      const a = this._$Eu(r, n);
      a !== void 0 && this._$Eh.set(a, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const r = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const a of n) r.unshift(ci(a));
    } else t !== void 0 && r.push(ci(t));
    return r;
  }
  static _$Eu(t, r) {
    const n = r.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const n of r.keys()) this.hasOwnProperty(n) && (t.set(n, this[n]), delete this[n]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Vh(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, r, n) {
    this._$AK(t, n);
  }
  _$ET(t, r) {
    const n = this.constructor.elementProperties.get(t), a = this.constructor._$Eu(t, n);
    if (a !== void 0 && n.reflect === !0) {
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : Ca).toAttribute(r, n.type);
      this._$Em = t, s == null ? this.removeAttribute(a) : this.setAttribute(a, s), this._$Em = null;
    }
  }
  _$AK(t, r) {
    const n = this.constructor, a = n._$Eh.get(t);
    if (a !== void 0 && this._$Em !== a) {
      const s = n.getPropertyOptions(a), i = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Ca;
      this._$Em = a, this[a] = i.fromAttribute(r, s.type) ?? this._$Ej?.get(a) ?? null, this._$Em = null;
    }
  }
  requestUpdate(t, r, n) {
    if (t !== void 0) {
      const a = this.constructor, s = this[t];
      if (n ?? (n = a.getPropertyOptions(t)), !((n.hasChanged ?? Oo)(s, r) || n.useDefault && n.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, n)))) return;
      this.C(t, r, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, r, { useDefault: n, reflect: a, wrapped: s }, i) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, i ?? r ?? this[t]), s !== !0 || i !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (r = void 0), this._$AL.set(t, r)), a === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (r) {
      Promise.reject(r);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [a, s] of this._$Ep) this[a] = s;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [a, s] of n) {
        const { wrapped: i } = s, l = this[a];
        i !== !0 || this._$AL.has(a) || l === void 0 || this.C(a, void 0, s, l);
      }
    }
    let t = !1;
    const r = this._$AL;
    try {
      t = this.shouldUpdate(r), t ? (this.willUpdate(r), this._$EO?.forEach((n) => n.hostUpdate?.()), this.update(r)) : this._$EM();
    } catch (n) {
      throw t = !1, this._$EM(), n;
    }
    t && this._$AE(r);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((r) => r.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((r) => this._$ET(r, this[r]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
Ht.elementStyles = [], Ht.shadowRootOptions = { mode: "open" }, Ht[Cr("elementProperties")] = /* @__PURE__ */ new Map(), Ht[Cr("finalized")] = /* @__PURE__ */ new Map(), Yh?.({ ReactiveElement: Ht }), (ct.reactiveElementVersions ?? (ct.reactiveElementVersions = [])).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $r = globalThis, $a = $r.trustedTypes, ui = $a ? $a.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, hc = "$lit$", at = `lit$${Math.random().toFixed(9).slice(2)}$`, pc = "?" + at, Jh = `<${pc}>`, Lt = document, dn = () => Lt.createComment(""), hn = (e) => e === null || typeof e != "object" && typeof e != "function", Eo = Array.isArray, Qh = (e) => Eo(e) || typeof e?.[Symbol.iterator] == "function", Na = `[
\f\r]`, dr = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, di = /-->/g, hi = />/g, wt = RegExp(`>|${Na}(?:([^\\s"'>=/]+)(${Na}*=${Na}*(?:[^
\f\r"'\`<>=]|("|')|))|$)`, "g"), pi = /'/g, _i = /"/g, _c = /^(?:script|style|textarea|title)$/i, Xh = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), ep = Xh(1), ar = Symbol.for("lit-noChange"), ue = Symbol.for("lit-nothing"), bi = /* @__PURE__ */ new WeakMap(), At = Lt.createTreeWalker(Lt, 129);
function bc(e, t) {
  if (!Eo(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ui !== void 0 ? ui.createHTML(t) : t;
}
const tp = (e, t) => {
  const r = e.length - 1, n = [];
  let a, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", i = dr;
  for (let l = 0; l < r; l++) {
    const f = e[l];
    let p, g, y = -1, S = 0;
    for (; S < f.length && (i.lastIndex = S, g = i.exec(f), g !== null);) S = i.lastIndex, i === dr ? g[1] === "!--" ? i = di : g[1] !== void 0 ? i = hi : g[2] !== void 0 ? (_c.test(g[2]) && (a = RegExp("</" + g[2], "g")), i = wt) : g[3] !== void 0 && (i = wt) : i === wt ? g[0] === ">" ? (i = a ?? dr, y = -1) : g[1] === void 0 ? y = -2 : (y = i.lastIndex - g[2].length, p = g[1], i = g[3] === void 0 ? wt : g[3] === '"' ? _i : pi) : i === _i || i === pi ? i = wt : i === di || i === hi ? i = dr : (i = wt, a = void 0);
    const U = i === wt && e[l + 1].startsWith("/>") ? " " : "";
    s += i === dr ? f + Jh : y >= 0 ? (n.push(p), f.slice(0, y) + hc + f.slice(y) + at + U) : f + at + (y === -2 ? l : U);
  }
  return [bc(e, s + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class pn {
  constructor({ strings: t, _$litType$: r }, n) {
    let a;
    this.parts = [];
    let s = 0, i = 0;
    const l = t.length - 1, f = this.parts, [p, g] = tp(t, r);
    if (this.el = pn.createElement(p, n), At.currentNode = this.el.content, r === 2 || r === 3) {
      const y = this.el.content.firstChild;
      y.replaceWith(...y.childNodes);
    }
    for (; (a = At.nextNode()) !== null && f.length < l;) {
      if (a.nodeType === 1) {
        if (a.hasAttributes()) for (const y of a.getAttributeNames()) if (y.endsWith(hc)) {
          const S = g[i++], U = a.getAttribute(y).split(at), j = /([.?@])?(.*)/.exec(S);
          f.push({ type: 1, index: s, name: j[2], strings: U, ctor: j[1] === "." ? np : j[1] === "?" ? ap : j[1] === "@" ? sp : Ba }), a.removeAttribute(y);
        } else y.startsWith(at) && (f.push({ type: 6, index: s }), a.removeAttribute(y));
        if (_c.test(a.tagName)) {
          const y = a.textContent.split(at), S = y.length - 1;
          if (S > 0) {
            a.textContent = $a ? $a.emptyScript : "";
            for (let U = 0; U < S; U++) a.append(y[U], dn()), At.nextNode(), f.push({ type: 2, index: ++s });
            a.append(y[S], dn());
          }
        }
      } else if (a.nodeType === 8) if (a.data === pc) f.push({ type: 2, index: s });
      else {
        let y = -1;
        for (; (y = a.data.indexOf(at, y + 1)) !== -1;) f.push({ type: 7, index: s }), y += at.length - 1;
      }
      s++;
    }
  }
  static createElement(t, r) {
    const n = Lt.createElement("template");
    return n.innerHTML = t, n;
  }
}
function sr(e, t, r = e, n) {
  if (t === ar) return t;
  let a = n !== void 0 ? r._$Co?.[n] : r._$Cl;
  const s = hn(t) ? void 0 : t._$litDirective$;
  return a?.constructor !== s && (a?._$AO?.(!1), s === void 0 ? a = void 0 : (a = new s(e), a._$AT(e, r, n)), n !== void 0 ? (r._$Co ?? (r._$Co = []))[n] = a : r._$Cl = a), a !== void 0 && (t = sr(e, a._$AS(e, t.values), a, n)), t;
}
class rp {
  constructor(t, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: r }, parts: n } = this._$AD, a = (t?.creationScope ?? Lt).importNode(r, !0);
    At.currentNode = a;
    let s = At.nextNode(), i = 0, l = 0, f = n[0];
    for (; f !== void 0;) {
      if (i === f.index) {
        let p;
        f.type === 2 ? p = new mn(s, s.nextSibling, this, t) : f.type === 1 ? p = new f.ctor(s, f.name, f.strings, this, t) : f.type === 6 && (p = new op(s, this, t)), this._$AV.push(p), f = n[++l];
      }
      i !== f?.index && (s = At.nextNode(), i++);
    }
    return At.currentNode = Lt, a;
  }
  p(t) {
    let r = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, r), r += n.strings.length - 2) : n._$AI(t[r])), r++;
  }
}
class mn {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, r, n, a) {
    this.type = 2, this._$AH = ue, this._$AN = void 0, this._$AA = t, this._$AB = r, this._$AM = n, this.options = a, this._$Cv = a?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && t?.nodeType === 11 && (t = r.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, r = this) {
    t = sr(this, t, r), hn(t) ? t === ue || t == null || t === "" ? (this._$AH !== ue && this._$AR(), this._$AH = ue) : t !== this._$AH && t !== ar && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Qh(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== ue && hn(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Lt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: r, _$litType$: n } = t, a = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = pn.createElement(bc(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === a) this._$AH.p(r);
    else {
      const s = new rp(a, this), i = s.u(this.options);
      s.p(r), this.T(i), this._$AH = s;
    }
  }
  _$AC(t) {
    let r = bi.get(t.strings);
    return r === void 0 && bi.set(t.strings, r = new pn(t)), r;
  }
  k(t) {
    Eo(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let n, a = 0;
    for (const s of t) a === r.length ? r.push(n = new mn(this.O(dn()), this.O(dn()), this, this.options)) : n = r[a], n._$AI(s), a++;
    a < r.length && (this._$AR(n && n._$AB.nextSibling, a), r.length = a);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    for (this._$AP?.(!1, !0, r); t && t !== this._$AB;) {
      const n = t.nextSibling;
      t.remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Ba {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, r, n, a, s) {
    this.type = 1, this._$AH = ue, this._$AN = void 0, this.element = t, this.name = r, this._$AM = a, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = ue;
  }
  _$AI(t, r = this, n, a) {
    const s = this.strings;
    let i = !1;
    if (s === void 0) t = sr(this, t, r, 0), i = !hn(t) || t !== this._$AH && t !== ar, i && (this._$AH = t);
    else {
      const l = t;
      let f, p;
      for (t = s[0], f = 0; f < s.length - 1; f++) p = sr(this, l[n + f], r, f), p === ar && (p = this._$AH[f]), i || (i = !hn(p) || p !== this._$AH[f]), p === ue ? t = ue : t !== ue && (t += (p ?? "") + s[f + 1]), this._$AH[f] = p;
    }
    i && !a && this.j(t);
  }
  j(t) {
    t === ue ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class np extends Ba {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === ue ? void 0 : t;
  }
}
class ap extends Ba {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== ue);
  }
}
class sp extends Ba {
  constructor(t, r, n, a, s) {
    super(t, r, n, a, s), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = sr(this, t, r, 0) ?? ue) === ar) return;
    const n = this._$AH, a = t === ue && n !== ue || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== ue && (n === ue || a);
    a && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class op {
  constructor(t, r, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    sr(this, t);
  }
}
const ip = $r.litHtmlPolyfillSupport;
ip?.(pn, mn), ($r.litHtmlVersions ?? ($r.litHtmlVersions = [])).push("3.3.0");
const gc = (e, t, r) => {
  const n = r?.renderBefore ?? t;
  let a = n._$litPart$;
  if (a === void 0) {
    const s = r?.renderBefore ?? null;
    n._$litPart$ = a = new mn(t.insertBefore(dn(), s), s, void 0, r ?? {});
  }
  return a._$AI(e), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rr = globalThis;
class Tr extends Ht {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var r;
    const t = super.createRenderRoot();
    return (r = this.renderOptions).renderBefore ?? (r.renderBefore = t.firstChild), t;
  }
  update(t) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = gc(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ar;
  }
}
Tr._$litElement$ = !0, Tr.finalized = !0, Rr.litElementHydrateSupport?.({ LitElement: Tr });
const cp = Rr.litElementPolyfillSupport;
cp?.({ LitElement: Tr });
(Rr.litElementVersions ?? (Rr.litElementVersions = [])).push("4.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lp = (e) => (t, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fp = { attribute: !0, type: String, converter: Ca, reflect: !1, hasChanged: Oo }, up = (e = fp, t, r) => {
  const { kind: n, metadata: a } = r;
  let s = globalThis.litPropertyMetadata.get(a);
  if (s === void 0 && globalThis.litPropertyMetadata.set(a, s = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), s.set(r.name, e), n === "accessor") {
    const { name: i } = r;
    return {
      set(l) {
        const f = t.get.call(this);
        t.set.call(this, l), this.requestUpdate(i, f, e);
      }, init(l) {
        return l !== void 0 && this.C(i, void 0, e, l), l;
      }
    };
  }
  if (n === "setter") {
    const { name: i } = r;
    return function (l) {
      const f = this[i];
      t.call(this, l), this.requestUpdate(i, f, e);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function ir(e) {
  return (t, r) => typeof r == "object" ? up(e, t, r) : ((n, a, s) => {
    const i = a.hasOwnProperty(s);
    return a.constructor.createProperty(s, n), i ? Object.getOwnPropertyDescriptor(a, s) : void 0;
  })(e, t, r);
}
var wc = Object.defineProperty, dp = Object.getOwnPropertyDescriptor, hp = (e, t, r) => t in e ? wc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, zt = (e, t, r, n) => {
  for (var a = n > 1 ? void 0 : n ? dp(t, r) : t, s = e.length - 1, i; s >= 0; s--)
    (i = e[s]) && (a = (n ? i(t, r, a) : i(a)) || a);
  return n && a && wc(t, r, a), a;
}, pp = (e, t, r) => hp(e, t + "", r);
const _p = () => ep` <style>
      :host {
        width: 100%;
      }</style
    ><style>
      :host {
        height: 100%;
      }
    </style>
    <div id="container">
      <canvas id="hana"></canvas>
      <div id="slot">
        <slot></slot>
      </div>
      <a id="logo" href="https://spline.design/?utm_source=spline-viewer&utm_campaign=spline-logo">
        <span></span>
        <svg
          width="89"
          height="13"
          viewBox="0 0 89 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#fff"
            d="M1 10V1.3h2.9c.6 0 1.2 0 1.6.3a2 2 0 0 1 1.1 1.8c0 .6-.1 1-.4 1.3-.3.3-.7.5-1.2.6.4 0 .7 0 1 .2l.7.7.2 1c0 .7-.1 1.2-.4 1.6-.2.4-.6.7-1 1L4 10H1Zm1.3-1.3h1.4c.6 0 1 0 1.3-.3.3-.2.4-.5.4-1s0-.8-.2-1a1 1 0 0 0-.6-.3 5 5 0 0 0-1 0H2.4v2.6Zm0-3.8h1.3c.4 0 .7 0 1-.2.2 0 .3-.2.4-.4l.1-.7c0-.4 0-.7-.4-.8-.3-.2-.6-.2-1-.2H2.2v2.3Zm7.9 5.2c-.6 0-1-.2-1.4-.6-.3-.4-.5-1-.5-1.7V3.4h1.4v4c0 .4 0 .6.2.8 0 .3.1.4.3.5l.6.1c.3 0 .6 0 .8-.2.3-.2.4-.4.5-.6V3.4h1.4V10h-1.2l-.1-2.5V8c0 .4 0 .7-.2 1-.1.4-.4.6-.6.8a2 2 0 0 1-1.2.3Zm5.1-.1V3.4h1.5V10h-1.5Zm.8-7.5a1 1 0 0 1-.7-.3 1 1 0 0 1-.3-.7 1 1 0 0 1 1-1l.6.3c.2.2.3.4.3.7 0 .3-.1.5-.3.7l-.6.3Zm2.4 7.5V.7H20V10h-1.5Zm5.2.1c-.6 0-1-.1-1.3-.4-.2-.3-.4-.7-.4-1.1V4.9l.3-.2-.3-1v-.2l.3-2h1.1v6.7c0 .2 0 .4.2.5l.5.1h.9V10a21.8 21.8 0 0 1-1.4 0Zm-2.5-5.4V3.4H25v1.3h-4Zm8.6 5.3-2-6.5h1.5l.8 3.2.4 2 .1.1.3-2.1.8-3.2h1.8l.8 3.2.3 2.2h.1l.4-2.2.8-3.2h1.6l-2 6.5h-1.7L33 6.9l-.3-2h-.1l-.4 2-.8 3.1h-1.6Zm8.7 0V3.4H40V10h-1.5Zm.8-7.5a1 1 0 0 1-.7-.3 1 1 0 0 1-.3-.7 1 1 0 0 1 1-1l.6.3c.2.2.3.4.3.7 0 .3-.1.5-.3.7l-.6.3Zm4.3 7.6c-.5 0-.9-.1-1.2-.4-.3-.3-.4-.7-.4-1.1V4.9l.3-.2-.3-1v-.2l.3-2h1v6.7l.2.5.6.1h.9V10a21.8 21.8 0 0 1-1.4 0Zm-2.5-5.4V3.4h4v1.3h-4Zm5.2 5.3V.7h1.5v2.8l-.1 1.8v.5-.4c0-.3 0-.7.2-1l.6-.8a2 2 0 0 1 1.2-.3c.6 0 1 .2 1.4.6.4.4.5 1 .5 1.8V10h-1.4V6.2c0-.6 0-1-.2-1.2-.2-.3-.5-.4-1-.4a1 1 0 0 0-.7.3 2 2 0 0 0-.5.6V10h-1.5Zm14.2 0V1.3h1.4V10h-1.4Zm-5 0V1.3H57V10h-1.4Zm1-3.8V4.9h4.2v1.3h-4.1Zm8.9 3.8c-.4 0-.8 0-1.1-.2-.3-.1-.6-.3-.7-.6-.2-.2-.3-.6-.3-1 0-.3 0-.6.2-.9l.6-.6 1-.3a9.2 9.2 0 0 1 1.6-.2h.5v-.4c0-.4 0-.7-.2-1-.2-.2-.5-.3-1-.3a2 2 0 0 0-.6.1c-.2 0-.3.2-.4.4l-.2.8h-1.3c0-.6 0-1 .3-1.4.2-.4.5-.6.9-.8a3.7 3.7 0 0 1 2.4-.1c.3 0 .5.1.8.3l.5.7.2 1.2V10h-1.4V8.5c0 .5-.2.8-.5 1.1-.3.3-.8.5-1.3.5Zm.3-1a2 2 0 0 0 1.2-.4c.2-.2.3-.3.3-.5V6.9a7.3 7.3 0 0 0-1 .2c-.5 0-.9.2-1 .4-.3.1-.4.3-.4.6 0 .2 0 .4.2.5l.3.3.4.1Zm4.7 1V3.4h1.2l.1 2.5v-.5c0-.3 0-.7.2-1l.6-.8a2 2 0 0 1 1.2-.3c.6 0 1 .2 1.4.6.4.4.5 1 .5 1.8V10h-1.4V5.2l-.4-.4-.7-.2c-.3 0-.6 0-.8.3a1 1 0 0 0-.5.6V10h-1.4Zm8.6 0c-.4 0-.7 0-1-.2-.4-.1-.6-.3-.8-.6l-.2-1c0-.3 0-.6.2-.9l.6-.6 1-.3a9.2 9.2 0 0 1 1.5-.2h.6v-.4c0-.4 0-.7-.3-1-.1-.2-.4-.3-.9-.3a2 2 0 0 0-.7.1l-.4.4-.1.8h-1.3c0-.6 0-1 .2-1.4.2-.4.5-.6 1-.8a3.7 3.7 0 0 1 2.4-.1c.2 0 .5.1.7.3l.6.7.2 1.2V10h-1.4V8.5c0 .5-.3.8-.6 1.1-.3.3-.7.5-1.3.5Zm.4-1a2 2 0 0 0 1.2-.4c.2-.2.3-.3.3-.5V6.9a7.3 7.3 0 0 0-1.1.2c-.5 0-.8.2-1 .4-.2.1-.3.3-.3.6l.1.5.4.3.4.1Z"
          />
        </svg>
      </a>
    </div>`;
let Xe = class extends Tr {
  constructor() {
    super();
    ge(this, "url", null);
    ge(this, "width");
    ge(this, "height");
    ge(this, "loading", "lazy");
    ge(this, "unloadable", !1);
    ge(this, "eventsTarget");
    ge(this, "_hana");
    ge(this, "_loaded", !1);
    ge(this, "_container");
    ge(this, "_canvas");
    ge(this, "_logo");
    ge(this, "_slot");
    ge(this, "_loadedUrl", null);
    ge(this, "onLoaded", () => {
      this._loaded = !0, this._hana?.data?.publish.logo !== !1 && (this._logo.style.display = "flex"), setTimeout(() => {
        this._canvas.style.visibility = "visible";
      }), this.dispatchEvent(new CustomEvent("load-complete", { detail: { url: this.url } })), this._slot.style.display = "none";
    });
    this.attachShadow({ mode: "open" });
    const t = this.shadowRoot;
    gc(_p(), t), this._container = t.querySelector("#container"), this._canvas = t.querySelector("#hana"), this._logo = t.querySelector("#logo"), this._slot = t.querySelector("#slot");
  }
  unload() {
    this._loaded && (this._loaded = !1, this._loadedUrl = null, this._hana?.dispose(), this.dispatchEvent(new CustomEvent("unload", { detail: {} })));
  }
  load() {
    if (!this._hana || this._loaded || !this.url || this.url === this._loadedUrl) return;
    this._canvas.style.visibility = "hidden", this.dispatchEvent(new CustomEvent("load-start", { detail: { url: this.url } })), this._loadedUrl = this.url;
    const t = this.shadowRoot?.querySelector("style:nth-child(1)"), r = this.shadowRoot?.querySelector("style:nth-child(2)");
    this.width !== void 0 && (this._container.style.width = this.width + "px", t?.remove()), this.height !== void 0 && (this._container.style.height = this.height + "px", r?.remove()), this._hana.load(this.url).then(this.onLoaded);
  }
  updated(t) {
    super.updated(t), t.has("url") && (this.url == null && this._loaded ? this.unload() : this.url !== this._loadedUrl && this.load());
    const r = this.shadowRoot?.querySelector("style:nth-child(1)"), n = this.shadowRoot?.querySelector("style:nth-child(2)");
    t.has("width") && this.width !== void 0 && (this._container.style.width = this.width + "px", r?.remove()), t.has("height") && this.height !== void 0 && (this._container.style.height = this.height + "px", n?.remove()), t.has("eventsTarget") && this.eventsTarget !== void 0 && this._hana && (this._hana.eventsTarget = this.eventsTarget);
  }
  connectedCallback() {
    super.connectedCallback(), this._hana || (this._hana = new Lh(this._canvas, {
      eventsTarget: this.eventsTarget,
      unloadable: this.unloadable,
      loading: this.loading
    })), this.url && this.load();
  }
};
pp(Xe, "styles", Fh`
    :host {
      display: block;
    }
    #container {
      width: 100%;
      height: 100%;
      position: relative;
    }
    #hana {
      display: block;
    }

    #slot {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      pointer-events: none;
    }

    #logo {
      display: none;
      position: absolute;
      z-index: 3;
      bottom: 20px;
      right: 20px;
      width: 137px;
      height: 36px;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 6px;
      border-radius: 12px;
      background: linear-gradient(180deg, #16181c 0%, #121316 100%);
      box-shadow:
        inset 0px -2px 0px -1px #060709,
        inset 0px 1px 0px rgba(255, 255, 255, 0.04);
    }
    #logo span {
      display: block;
      width: 20px;
      height: 20px;
      background-image: url(https://app.spline.design/_assets/_icons/icon_favicon32x32.png);
      background-size: cover;
    }
    #logo svg {
      display: block;
      margin-right: 2px;
    }
    #logo:hover {
      background: linear-gradient(180deg, #1b1c21 0%, #17181c 100%);
    }
  `);
zt([
  ir({ type: String })
], Xe.prototype, "url", 2);
zt([
  ir({ type: Number })
], Xe.prototype, "width", 2);
zt([
  ir({ type: Number })
], Xe.prototype, "height", 2);
zt([
  ir({ type: String })
], Xe.prototype, "loading", 2);
zt([
  ir({ type: Boolean })
], Xe.prototype, "unloadable", 2);
zt([
  ir({ type: String, attribute: "events-target" })
], Xe.prototype, "eventsTarget", 2);
Xe = zt([
  lp("hana-viewer")
], Xe);
export {
  Xe as SplineViewer
};
