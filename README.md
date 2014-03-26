[SimpleStatechart](http://mmazo.de/statechart/) - Simple state chart (workflow) tool
======================================================================================

About
--------------------------------------

SimpleStatechart, as the name says, is a simple static state chart (workflow) rendering
tool in form of jQuery plugin. It is written to be used by non-frontend developers.
This means js, html or css knowledge reguired is minimal.

How to use
----------

Simply add states and transitions to Your page and plugin does all for you:

...
<body>
  <div id="statechart-example" class="simple-statechart">
    <div id="001" class="state">state 001</div>
    <div id="002" class="state">state 002</div>
    <div id="003" class="state">state 003</div>
    <div id="004" class="state">state 004</div>
    <div id="005" class="state">state 005</div>
    <div id="006" class="state">state 006</div>
    <div id="007" class="state">state 007</div>
    <div id="008" class="state">state 008</div>
    <a href="#" id="001-002" class="transition-right" data-index="1">001-002</a>
    <a href="#" id="002-001" class="transition-left" data-index="8">002-001</a>
    <a href="#" id="001-003" class="transition-right" data-index="9">001-003</a>
    <a href="#" id="003-001" class="transition-left" data-index="10">003-001</a>
    <a href="#" id="001-004" class="transition-down" data-index="11">001-004</a>
    <a href="#" id="004-001" class="transition-up" data-index="14">004-001</a>
    <a href="#" id="004-005" class="transition-right" data-index="12">004-005</a>
    <a href="#" id="005-004" class="transition-left" data-index="13">005-004</a>
    <a href="#" id="002-006" class="transition-right" data-index="2">002-006</a>
    <a href="#" id="006-002" class="transition-left" data-index="7">006-002</a>
    <a href="#" id="006-007" class="transition-right" data-index="3">006-007</a>
    <a href="#" id="007-006" class="transition-left" data-index="4">007-006</a>
    <a href="#" id="006-008" class="transition-right" data-index="5">006-008</a>
    <a href="#" id="008-006" class="transition-left" data-index="6">008-006</a>
  </div>
  <script src="js/jquery-1.11.0.min.js" type="text/javascript"></script>
  <script src="js/simple-statechart.js" type="text/javascript"></script>
  <script type="text/javascript">
    jQuery(document).ready(function(){
      jQuery('#statechart-example').statechart({
        activeStateId: '001',
        activeTransitionId: '001-002'
      });
    });
  </script>
</body>
...

Questions?
----------

If you have any questions, please feel free to ask on the
[Michail Mazo] (http://mmazo.de) or email: michail.mazo@gmail.com.
