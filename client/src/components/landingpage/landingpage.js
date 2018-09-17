import React, { Component } from "react";
import { Button, Modal } from "@material-ui/core";
import "./landingpage.css";
import "../login";

const LandingPage = props => {
  return (
    <div className="landing-page">
      <div className="landing-buttons">
        <Button color="primary">Create Account</Button>
        <Button color="secondary">Log In</Button>
      </div>
      <div className="landing-blurb">
        <p>
          Placeholder for the blurb!!!\nLorem ipsum dolor sit amet, consectetur
          adipiscing elit. Aliquam volutpat tempor augue, quis venenatis ligula
          volutpat et. Mauris ac rhoncus ipsum. Donec et sodales magna. Sed sed
          varius sem, non convallis tellus. Mauris maximus dignissim nibh at
          pretium. Donec posuere semper leo, eu porttitor metus consequat eget.
          Aliquam in molestie lectus, sit amet euismod purus. Interdum et
          malesuada fames ac ante ipsum primis in faucibus. Quisque non ligula
          sagittis, fermentum neque id, cursus orci. Donec porta, tellus
          suscipit placerat luctus, odio leo imperdiet lorem, a ultrices lorem
          augue vel ipsum. Fusce vel pretium ligula. Nunc posuere, augue a
          fringilla euismod, erat tortor sollicitudin felis, a luctus velit enim
          id mi. Duis sodales bibendum eros non vulputate. Donec volutpat dolor
          eget libero ultrices congue sit amet at ante. Cras a risus quis quam
          finibus molestie nec id neque. Morbi blandit bibendum lacus, ut
          porttitor dolor efficitur sed. Sed sit amet tortor nulla. Morbi
          rhoncus ex vitae ligula feugiat, semper convallis turpis eleifend. In
          venenatis nibh non quam lacinia feugiat. Integer dui felis, fringilla
          eu tempus eget, tincidunt id eros. Nulla iaculis augue ligula, dictum
          imperdiet nunc rutrum eu. Integer in tortor quis tortor volutpat
          accumsan vel non tortor. Quisque sodales eleifend tortor, quis
          consequat risus cursus sit amet. Sed ultricies consectetur nibh, in
          sollicitudin nulla porttitor ac. Proin molestie varius lacus non
          venenatis. Donec nec cursus mauris. Proin ultricies ipsum at purus
          varius, in tincidunt diam pretium. Nunc mattis mauris nunc, et
          vehicula mauris mollis euismod. Nullam quam ligula, blandit volutpat
          sem sit amet, tincidunt bibendum lacus. Curabitur et purus lorem. Ut
          faucibus aliquet imperdiet.
        </p>
      </div>
    </div>
  );
};

export { LandingPage };
