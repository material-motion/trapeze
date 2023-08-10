# Trapeze: #
## a Preact library for paginated experiences ##

If a picture is worth a thousand words, a demo is worth a million.

Trapeze is a Preact library for paginated experiences.  It enables you to make
slide decks with interactive demos, so you can give presentations with the full
power of the web.

## Usage ##

### Navigation ###

#### `next()` and `previous()` ####

These are the functions you use to move through Trapeze.  Call `next()` to go
forward and `previous()` to go backwards.

`next()` sets `index += 1` and `previous()` sets `index -= 1`.  See
[`useTrapeze(…)`](#usetrapezelength-number-number) for more on `index`.

### Components ###

#### `<Spotlight>` ####

`<Spotlight>` presents each of its children, with only one showing at a time.

```jsx
<Spotlight>
  <FirstSlide />
  <SecondSlide />
  <ThirdSlide />
</Spotlight>
```

would show `<FirstSlide />`.  When `next()` is called, it will replace it with
`<SecondSlide />`.

#### `<Build>` ####

`<Build>` incrementally presents its children, showing one more every time
`next()` is called.

```jsx
<Build>
  <li>First point</li>
  <li>Second point</li>
  <li>Third point</li>
</Build>
```

would show the first `<li />`.  When `next()` is called, it will show the first
two `<li />`s.

### Hooks ###

#### `useTrapeze(length: number): number` ####

`useTrapeze(…)` is a hook that tells Trapeze how many `next()` calls your
component will handle.

```jsx
const index = useTrapeze(3);
```

Your component will be rendered with `index` at `0`, `1`, and `2` as `next()` is
called.

Trapeze increments the deepest `useTrapeze(…)` hook first.

```jsx
<Trunk>
  <BranchA>
    <LeafA />
    <LeafB />
    <LeafC />
  </BranchA>
  <BranchB>
    <LeafD />
    <LeafE />
  </BranchB>
</Trunk>
```

Imagine `<Trunk>` has called `useTrapeze(2)` (for each branch); `<BranchA>` has
`useTrapeze(3)`, and `<BranchB>` has `useTrapeze(2)` (for each leaf).

`next()` will increment `<BranchA>` for the first 3 calls.  The 4th call will
increment `<Trunk>`.  If `<Trunk>` presents its children incrementally (like
`<Spotlight>`), that will cause `<BranchB>` to be mounted.  `<BranchB>` will
receive the next 2 `next()` calls.

This example uses tree names to explain the order of incrementation.  In a more
realistic example, the trunk might be a `<Spotlight>` and the branches might be
`<Build>`s.

`useTrapeze(…)` can be included at any depth in your component tree.  For
instance

```jsx
<Spotlight>
  <ul>
    <Build>
      <li>one</li>
      <li>two</li>
    </Build>
  </ul>
  <ul>
    <Build>
      <li>three</li>
      <li>four</li>
    </Build>
  </ul>
</Spotlight>
```
`ul` and `li` don't call `useTrapeze()`, so `next()` will only increment the
`<Build>`s and `<Spotlight>`.

### Integrations ###

#### `attachTrapezeToHistory()` ####

`attachTrapezeToHistory()` binds `previous()` and `next()` to the browser's
Back and Forward buttons.

#### `attachTrapezeToArrowKeys()` ####

`attachTrapezeToArrowKeys()` binds `previous()` and `next()` to the keyboard's
Left and Right keys.

## Quirks ##

- Navigation in Trapeze is not always symmetric.  You may call only have to call
  `previous()` a few times to get back to where you were many `next()`s ago.

  This is because `useTrapeze()` is always initialized with an `index` of `0`,
  but `index` would have been `length - 1` when Trapeze incremented the parent.

## Questions ##

### What about React? ###

Trapeze was originally written for React, and was later ported to Preact.

The differences between the two versions are minor.  Aside from changing
`preact` to `react` and making the requisite changes to the types, the only
difference is that Preact uses `toChildArray` instead of `React.Children`.

As Trapeze evolves, we may move to `@preact/signals` instead of `preact/hooks`.
If we stick with hooks, we may provide an abstraction to support both React and
Preact.

## Addendum ##

**This is not an officially supported Google product.**  While we do use it
internally, open-source support is provided on a best-effort basis.

Thank you to [Robert Penner](https://github.com/robertpenner) for allowing us
to publish the under the name `trapeze`.

## License ##

[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0)
