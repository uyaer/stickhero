<GameProjectFile>
  <PropertyGroup Type="Scene" Name="GameBgLayer" ID="3ebd2581-27fe-4560-b275-a034b244d048" Version="2.3.2.3" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Scene" Tag="3" ctype="GameNodeObjectData">
        <Size X="720.0000" Y="1280.0000" />
        <Children>
          <AbstractNodeData Name="bgcolor_full" ActionTag="-708584977" Tag="4" IconVisible="False" ComboBoxIndex="1" ColorAngle="90.0000" ctype="PanelObjectData">
            <Size X="720.0000" Y="1280.0000" />
            <AnchorPoint />
            <Position />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition />
            <PreSize X="1.0000" Y="1.0000" />
            <SingleColor A="255" R="43" G="117" B="166" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="bg_1" ActionTag="959597777" Tag="5" IconVisible="False" TopMargin="286.0000" ctype="SpriteObjectData">
            <Size X="720.0000" Y="994.0000" />
            <AnchorPoint />
            <Position />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition />
            <PreSize X="0.0000" Y="0.0000" />
            <FileData Type="Normal" Path="jpg/bg.png" Plist="" />
            <BlendFunc Src="770" Dst="771" />
          </AbstractNodeData>
          <AbstractNodeData Name="Particle_1" ActionTag="-642465814" Tag="11" IconVisible="True" LeftMargin="367.8966" RightMargin="352.1034" TopMargin="552.7713" BottomMargin="727.2287" ctype="ParticleObjectData">
            <Size X="0.0000" Y="0.0000" />
            <AnchorPoint />
            <Position X="367.8966" Y="727.2287" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5110" Y="0.5681" />
            <PreSize X="0.0000" Y="0.0000" />
            <FileData Type="Normal" Path="effects/snow.plist" Plist="" />
            <BlendFunc Src="1" Dst="772" />
          </AbstractNodeData>
          <AbstractNodeData Name="ligth" ActionTag="1412377149" Tag="6" IconVisible="False" LeftMargin="21.6375" RightMargin="36.3625" TopMargin="-84.7740" BottomMargin="702.7740" ctype="SpriteObjectData">
            <Size X="662.0000" Y="662.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="352.6375" Y="1033.7740" />
            <Scale ScaleX="0.4348" ScaleY="0.4348" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.4898" Y="0.8076" />
            <PreSize X="0.0000" Y="0.0000" />
            <FileData Type="Normal" Path="jpg/biglight.png" Plist="" />
            <BlendFunc Src="1" Dst="771" />
          </AbstractNodeData>
          <AbstractNodeData Name="backBtn" ActionTag="-1424906111" Tag="9" IconVisible="False" LeftMargin="585.9275" RightMargin="24.0725" TopMargin="18.1240" BottomMargin="1148.8760" TouchEnable="True" FontSize="14" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="80" Scale9Height="91" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
            <Size X="110.0000" Y="113.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="1.0000" />
            <Position X="640.9275" Y="1261.8760" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.8902" Y="0.9858" />
            <PreSize X="0.1528" Y="0.0883" />
            <TextColor A="255" R="65" G="65" B="70" />
            <NormalFileData Type="MarkedSubImage" Path="common/back.png" Plist="common.plist" />
            <OutlineColor A="255" R="255" G="0" B="0" />
            <ShadowColor A="255" R="110" G="110" B="110" />
          </AbstractNodeData>
          <AbstractNodeData Name="musicBtn" ActionTag="-851766302" Tag="10" IconVisible="False" LeftMargin="34.7761" RightMargin="575.2239" TopMargin="19.5942" BottomMargin="1150.4058" TouchEnable="True" FontSize="14" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="80" Scale9Height="88" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
            <Size X="110.0000" Y="110.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="1.0000" />
            <Position X="89.7761" Y="1260.4058" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.1247" Y="0.9847" />
            <PreSize X="0.1528" Y="0.0859" />
            <TextColor A="255" R="65" G="65" B="70" />
            <NormalFileData Type="MarkedSubImage" Path="common/music_on.png" Plist="common.plist" />
            <OutlineColor A="255" R="255" G="0" B="0" />
            <ShadowColor A="255" R="110" G="110" B="110" />
          </AbstractNodeData>
          <AbstractNodeData Name="scoreTF" ActionTag="-44842037" Tag="12" IconVisible="False" LeftMargin="332.5653" RightMargin="330.4347" TopMargin="151.4642" BottomMargin="987.5358" LabelText="0" ctype="TextBMFontObjectData">
            <Size X="57.0000" Y="141.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="361.0653" Y="1058.0358" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5015" Y="0.8266" />
            <PreSize X="0.0792" Y="0.1102" />
            <LabelBMFontFile_CNB Type="Normal" Path="fonts/scorefont.fnt" Plist="" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameProjectFile>